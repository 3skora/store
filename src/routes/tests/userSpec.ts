import supertest from 'supertest'
import db from '../../database'
import UserModel from '../../models/user.model'
import User from '../../types/user.type'
import app from '../../index'

const userModel = new UserModel()
const request = supertest(app)
let token = ''

describe('User API Endpoints', () => {
  const testUser = {
    email: 'test@test.com',
    user_name: 'testUser',
    first_name: 'Test',
    last_name: 'User',
    password: 'test123'
  } as User

  beforeAll(async () => {
    const createdUser = await userModel.create(testUser)
    testUser.id = createdUser.id
  })

  afterAll(async () => {
    // clean db
    const connection = await db.connect()
    const sql = 'DELETE FROM users;'
    await connection.query(sql)
    connection.release()
  })

  describe('Test login method', () => {
    it('user should be able to login to get token', async () => {
      const res = await request.post('/api/users/login').send({
        email: testUser.email,
        password: testUser.password
      })
      expect(res.status).toBe(200)
      const { id, token: userToken } = res.body.data
      expect(id).toBe(testUser.id)
      token = userToken
    })

    it('user should not be failed to login with wrong email', async () => {
      const res = await request.post('/api/users/login').send({
        email: 'wrong@email.com',
        password: 'test123'
      })
      expect(res.status).toBe(401)
    })
  })

  describe('Test CRUD API methods', () => {
    it('should create new user', async () => {
      const res = await request
        .post('/api/users/')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'test2@test2.com',
          user_name: 'testUser2',
          first_name: 'Test2',
          last_name: 'User2',
          password: 'test123'
        } as User)
      expect(res.status).toBe(200)
      const { email, user_name, first_name, last_name } = res.body.data
      expect(email).toBe('test2@test2.com')
      expect(user_name).toBe('testUser2')
      expect(first_name).toBe('Test2')
      expect(last_name).toBe('User2')
    })

    it('should get list all users', async () => {
      const res = await request.get('/api/users/').set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(2)
    })

    it('should get user info with :id', async () => {
      const res = await request.get(`/api/users/${testUser.id}`).set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.user_name).toBe(testUser.user_name)
      expect(res.body.data.email).toBe(testUser.email)
      expect(res.body.data.id).toBe(testUser.id)
    })

    it('should update user info', async () => {
      const res = await request
        .patch(`/api/users/${testUser.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...testUser,
          user_name: 'testUser updated',
          first_name: 'test Updated',
          last_name: 'user Updated'
        })
      expect(res.status).toBe(200)

      const { id, email, user_name, first_name, last_name } = res.body.data
      expect(id).toBe(testUser.id)
      expect(email).toBe(testUser.email)
      expect(user_name).toBe('testUser updated')
      expect(first_name).toBe('test Updated')
      expect(last_name).toBe('user Updated')
    })

    it('should delete user', async () => {
      const res = await request
        .delete(`/api/users/${testUser.id}`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.id).toBe(testUser.id)
    })
  })
})
