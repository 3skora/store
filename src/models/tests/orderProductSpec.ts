import OrderProductModel from '../orderProduct.model'

const orderProductModel = new OrderProductModel()

describe('Order-Product Model', () => {
  describe('Test CRUD methods exist', () => {
    it('checks if getAll method is defined', () => {
      expect(orderProductModel.getAll).toBeDefined()
    })

    it('checks if getOrderProduct method is defined', () => {
      expect(orderProductModel.getOrderProduct).toBeDefined()
    })

    it('checks if create method is defined', () => {
      expect(orderProductModel.create).toBeDefined()
    })

    it('checks if updateOrderProduct method is defined', () => {
      expect(orderProductModel.updateOrderProductQuantity).toBeDefined()
    })

    it('checks if deleteOrderProduct method is defined', () => {
      expect(orderProductModel.deleteOrderProduct).toBeDefined()
    })
  })
})
