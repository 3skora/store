import UserModel from '../user.model'
import db from '../../database'
import User from '../../types/user.type'

const userModel = new UserModel()

describe('User Model', () => {
  describe('Test CRUD methods exist', () => {
    it('checks if getAll method is defined', () => {
      expect(userModel.getAll).toBeDefined()
    })

    it('checks if getUser method is defined', () => {
      expect(userModel.getUser).toBeDefined()
    })

    it('checks if create method is defined', () => {
      expect(userModel.create).toBeDefined()
    })

    it('checks if updateUser method is defined', () => {
      expect(userModel.updateUser).toBeDefined()
    })

    it('checks if deleteUser method is defined', () => {
      expect(userModel.deleteUser).toBeDefined()
    })

    it('checks if login method is defined', () => {
      expect(userModel.login).toBeDefined()
    })
  })

  describe('Test User Model Logic', () => {
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
      const connection = await db.connect()
      const sql = 'DELETE FROM users;'
      await connection.query(sql)
      connection.release()
    })

    it('Create method should return a New User', async () => {
      const createdUser = await userModel.create({
        email: 'test2@test.com',
        user_name: 'test2User',
        first_name: 'Test',
        last_name: 'User',
        password: 'test123'
      } as User)
      expect(createdUser).toEqual({
        id: createdUser.id,
        email: 'test2@test.com',
        user_name: 'test2User',
        first_name: 'Test',
        last_name: 'User'
      } as User)
    })

    it('GetAll method should return All available users in DB', async () => {
      const users = await userModel.getAll()
      expect(users.length).toBe(2)
    })

    it('GetUser method should return testUser when called with ID', async () => {
      const returnedUser = await userModel.getUser(testUser.id as string)
      expect(returnedUser?.id).toBe(testUser.id)
      expect(returnedUser?.email).toBe(testUser.email)
      expect(returnedUser?.user_name).toBe(testUser.user_name)
      expect(returnedUser?.first_name).toBe(testUser.first_name)
      expect(returnedUser?.last_name).toBe(testUser.last_name)
    })

    it('Login method should return the authenticated user', async () => {
      const authenticatedUser = await userModel.login(testUser.email, testUser.password as string)
      expect(authenticatedUser?.email).toBe(testUser.email)
      expect(authenticatedUser?.user_name).toBe(testUser.user_name)
      expect(authenticatedUser?.first_name).toBe(testUser.first_name)
      expect(authenticatedUser?.last_name).toBe(testUser.last_name)
    })

    it('Login method should return null for wrong credentials', async () => {
      const authenticatedUser = await userModel.login('fake@fake.com', 'fake123')
      expect(authenticatedUser).toBe(null)
    })

    it('UpdateUser method should return a user with updated attributes', async () => {
      const updatedUser = await userModel.updateUser(testUser.id, {
        ...testUser,
        user_name: 'testUser Updated',
        first_name: 'test Updated',
        last_name: 'user Updated'
      })
      expect(updatedUser.id).toBe(testUser.id)
      expect(updatedUser.email).toBe(testUser.email)
      expect(updatedUser.user_name).toBe('testUser Updated')
      expect(updatedUser.first_name).toBe('test Updated')
      expect(updatedUser.last_name).toBe('user Updated')
    })

    it('DeleteUser method should delete user from DB', async () => {
      const deletedUser = await userModel.deleteUser(testUser.id as string)
      expect(deletedUser.id).toBe(testUser.id)
    })
  })
})
