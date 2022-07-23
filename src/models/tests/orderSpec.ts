import db from '../../database'
import OrderModel from '../order.model'
import Order from '../../types/order.type'
import UserModel from '../user.model'
import User from '../../types/user.type'
import Product from '../../types/product.type'
import ProductModel from '../product.model'
import OrderProductModel from '../orderProduct.model'
import OrderProduct from '../../types/orderProduct.type'

const userModel = new UserModel()
const productModel = new ProductModel()
const orderModel = new OrderModel()
const orderProductModel = new OrderProductModel()

describe('Order Model', () => {
  describe('Test CRUD methods exist', () => {
    it('checks if getAll method is defined', () => {
      expect(orderModel.getAll).toBeDefined()
    })

    it('checks if getOrder method is defined', () => {
      expect(orderModel.getOrder).toBeDefined()
    })

    it('checks if getOrder method is defined', () => {
      expect(orderModel.getOrdersOfUser).toBeDefined()
    })

    it('checks if create method is defined', () => {
      expect(orderModel.create).toBeDefined()
    })

    it('checks if updateOrder method is defined', () => {
      expect(orderModel.updateOrderStatus).toBeDefined()
    })

    it('checks if deleteOrder method is defined', () => {
      expect(orderModel.deleteOrder).toBeDefined()
    })
  })

  describe('Test Order Model Logic', () => {
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

      const createdProduct = await productModel.create(testProduct)
      testProduct.id = createdProduct.id

      testOrder.user_id = createdUser.id
      const createdOrder = await orderModel.create(testOrder)
      testOrder.id = createdOrder.id

      testOrderProduct.product_id = createdProduct.id
      testOrderProduct.order_id = createdOrder.id
      const createdOrderProduct = await orderProductModel.create(testOrderProduct)
      createdOrderProduct.id = createdProduct.id
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql =
        'DELETE FROM orders; DELETE FROM users; DELETE FROM products; DELETE FROM order_product;'
      await connection.query(sql)
      connection.release()
    })

    it('Create method should return a New Order', async () => {
      const createdOrder = await orderModel.create({
        user_id: testUser.id,
        status: 'active'
      } as Order)
      expect(createdOrder.user_id).toBe(testUser.id)
      expect(createdOrder.status).toBe('active')
    })

    it('GetAll method should return All available Orders in DB', async () => {
      const Orders = await orderModel.getAll()
      expect(Orders.length).toBe(1)
    })

    it('GetOrder method should return testOrder when called with ID', async () => {
      const returnedOrder = ((await orderModel.getOrder(testOrder.id as string)) as Array<Order>)[0]
      expect(returnedOrder?.id).toBe(testOrder.id)
    })

    it('UpdateOrder method should return a Order with updated attributes', async () => {
      const updatedOrder = (await orderModel.updateOrderStatus(testOrder.id, {
        ...testOrder,
        status: 'complete'
      })) as Order
      expect(updatedOrder.id).toBe(testOrder.id)
      expect(updatedOrder.status).toBe('complete')
    })

    it('DeleteOrder method should delete Order from DB', async () => {
      const deletedOrder = await orderModel.deleteOrder(testOrder.id as string)
      expect(deletedOrder.id).toBe(testOrder.id)
    })
  })
})
