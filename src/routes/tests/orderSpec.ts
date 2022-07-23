import supertest from 'supertest'
import db from '../../database'
import app from '../../index'
import ProductModel from '../../models/product.model'
import UserModel from '../../models/user.model'
import OrderModel from '../../models/order.model'
import OrderProductModel from '../../models/orderProduct.model'
import Product from '../../types/product.type'
import User from '../../types/user.type'
import Order from '../../types/order.type'
import OrderProduct from '../../types/orderProduct.type'

const userModel = new UserModel()
const productModel = new ProductModel()
const orderModel = new OrderModel()
const orderProductModel = new OrderProductModel()

const request = supertest(app)
let token = ''

describe('Order API Endpoints', () => {
  const testUser = {
    email: 'test@test.com',
    user_name: 'testUser',
    first_name: 'Test',
    last_name: 'User',
    password: 'test123'
  } as User

  const testProduct = {
    name: 'test name',
    price: 10.5,
    category: 'test category',
    description: 'test description'
  } as Product

  const testOrderProduct = {
    quantity: 4
  } as OrderProduct

  const testOrder = {
    status: 'active'
  } as Order

  beforeAll(async () => {
    const createdUser = await userModel.create(testUser)
    testUser.id = createdUser.id

    const res = await request.post('/api/users/login').send({
      email: testUser.email,
      password: testUser.password
    })

    token = res.body.data.token

    const createdProduct = await productModel.create(testProduct)
    testProduct.id = createdProduct.id

    testOrder.user_id = createdUser.id
    const createdOrder = await orderModel.create(testOrder)
    testOrder.id = createdOrder.id

    testOrderProduct.product_id = createdProduct.id
    testOrderProduct.order_id = createdOrder.id
    const createdOrderProduct = await orderProductModel.create(testOrderProduct)
    testOrderProduct.id = createdOrderProduct.id
  })

  afterAll(async () => {
    // clean db
    const connection = await db.connect()
    const sql =
      'DELETE FROM orders; DELETE FROM users; DELETE FROM products; DELETE FROM order_product;'
    // const sql2 = 'DELETE FROM products;'
    await connection.query(sql)
    // await connection.query(sql2)
    connection.release()
  })

  describe('Test CRUD API methods', () => {
    it('should create new order', async () => {
      const res = await request
        .post('/api/orders/')
        .set('Authorization', `Bearer ${token}`)
        .send({
          user_id: testUser.id,
          status: 'active'
        } as Order)
      expect(res.status).toBe(200)
      const { user_id, status } = res.body.data
      expect(user_id).toBe(testUser.id)
      expect(status).toBe('active')
    })

    it('should get list all orders', async () => {
      const res = await request.get('/api/orders/').set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(1)
    })

    it('should get order info with :id', async () => {
      const res = await request
        .get(`/api/orders/${testOrder.id}`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data[0].user_id).toBe(testOrder.user_id)
      expect(res.body.data[0].status).toBe(testOrder.status)
    })

    it('should get order info of user with :id', async () => {
      const res = await request
        .get(`/api/orders/users/${testUser.id}`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data[0].user_id).toBe(testUser.id)
    })

    it('should update product info', async () => {
      const res = await request
        .patch(`/api/orders/${testOrder.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...testOrder,
          status: 'complete'
        })
      expect(res.status).toBe(200)
      expect(res.body.data.status).toBe('complete')
    })

    it('should delete product', async () => {
      const res = await request
        .delete(`/api/orders/${testOrder.id}`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.id).toBe(testOrder.id)
    })
  })
})
