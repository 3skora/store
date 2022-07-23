import supertest from 'supertest'
import db from '../../database'
import app from '../../index'
import ProductModel from '../../models/product.model'
import UserModel from '../../models/user.model'
import Product from '../../types/product.type'
import User from '../../types/user.type'

const userModel = new UserModel()
const productModel = new ProductModel()

const request = supertest(app)
let token = ''

describe('Product API Endpoints', () => {
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
  })

  afterAll(async () => {
    // clean db
    const connection = await db.connect()
    const sql = 'DELETE FROM users; DELETE FROM products;'
    // const sql2 = 'DELETE FROM products;'
    await connection.query(sql)
    // await connection.query(sql2)
    connection.release()
  })

  describe('Test CRUD API methods', () => {
    it('should create new product', async () => {
      const res = await request
        .post('/api/products/')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'test name2',
          price: 10.5,
          category: 'test category2',
          description: 'test description2'
        } as Product)
      expect(res.status).toBe(200)
      const { name, price, category, description } = res.body.data
      expect(name).toBe('test name2')
      expect(price).toBe('10.50')
      expect(category).toBe('test category2')
      expect(description).toBe('test description2')
    })

    it('should get list all products', async () => {
      const res = await request.get('/api/products/')
      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(2)
    })

    it('should get product info with :id', async () => {
      const res = await request.get(`/api/products/${testProduct.id}`)
      expect(res.status).toBe(200)
      expect(res.body.data.name).toBe(testProduct.name)
      expect(res.body.data.category).toBe(testProduct.category)
      expect(res.body.data.description).toBe(testProduct.description)
    })

    it('should update product info', async () => {
      const res = await request
        .patch(`/api/products/${testProduct.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...testProduct,
          name: 'test name2',
          price: 10.5,
          category: 'test category2',
          description: 'test description2'
        })
      expect(res.status).toBe(200)

      const { id, name, price, category, description } = res.body.data
      expect(id).toBe(testProduct.id)
      expect(name).toBe('test name2')
      expect(price).toBe('10.50')
      expect(category).toBe('test category2')
      expect(description).toBe('test description2')
    })

    it('should delete product', async () => {
      const res = await request
        .delete(`/api/products/${testProduct.id}`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.id).toBe(testProduct.id)
    })
  })
})
