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

describe('OrderProduct API Endpoints', () => {
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
    it('should create new orderProduct', async () => {
      const res = await request
        .post('/api/orderProduct/')
        .set('Authorization', `Bearer ${token}`)
        .send({
          product_id: testProduct.id,
          quantity: 4,
          order_id: testOrder.id
        } as OrderProduct)
      expect(res.status).toBe(200)
      const { product_id, quantity, order_id } = res.body.data
      expect(product_id).toBe(testProduct.id)
      expect(quantity).toBe(4)
      expect(order_id).toBe(testOrder.id)
    })

    it('should get list all orderProduct', async () => {
      const res = await request.get('/api/orderProduct/').set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(2)
    })

    it('should get orderProduct info with :id', async () => {
      const res = await request
        .get(`/api/orderProduct/${testOrderProduct.id}`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.product_id).toBe(testOrderProduct.product_id)
      expect(res.body.data.quantity).toBe(4)
      expect(res.body.data.order_id).toBe(testOrderProduct.order_id)
    })

    it('should update OrderProduct info', async () => {
      console.log(
        '🚀 ~ file: orderProductSpec.ts ~ line 121 ~ it ~ testOrderProduct.id',
        testOrderProduct
      )
      const res = await request
        .patch(`/api/orderProduct/${testOrderProduct.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...testOrderProduct,
          quantity: 9
        })

      expect(res.status).toBe(200)
      expect(res.body.data.quantity).toBe(9)
    })

    it('should delete orderProduct', async () => {
      const res = await request
        .delete(`/api/orderProduct/${testOrderProduct.id}`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.id).toBe(testOrderProduct.id)
    })
  })
})
