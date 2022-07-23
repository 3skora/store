import ProductModel from '../product.model'
import db from '../../database'
import Product from '../../types/product.type'

const productModel = new ProductModel()

describe('Product Model', () => {
  describe('Test CRUD methods exist', () => {
    it('checks if getAll method is defined', () => {
      expect(productModel.getAll).toBeDefined()
    })

    it('checks if getProduct method is defined', () => {
      expect(productModel.getProduct).toBeDefined()
    })

    it('checks if create method is defined', () => {
      expect(productModel.create).toBeDefined()
    })

    it('checks if updateProduct method is defined', () => {
      expect(productModel.updateProduct).toBeDefined()
    })

    it('checks if deleteProduct method is defined', () => {
      expect(productModel.deleteProduct).toBeDefined()
    })
  })

  describe('Test Product Model Logic', () => {
    const testProduct = {
      name: 'test name',
      price: 10.5,
      category: 'test category',
      description: 'test description'
    } as Product

    beforeAll(async () => {
      const createdProduct = await productModel.create(testProduct)
      testProduct.id = createdProduct.id
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql = 'DELETE FROM products;'
      await connection.query(sql)
      connection.release()
    })

    it('Create method should return a New Product', async () => {
      const createdProduct = await productModel.create({
        name: 'test name2',
        price: 10.5,
        category: 'test category2',
        description: 'test description2'
      } as Product)
      expect(createdProduct.name).toBe('test name2')
      expect(createdProduct.category).toBe('test category2')
      expect(createdProduct.description).toBe('test description2')
    })

    it('GetAll method should return All available products in DB', async () => {
      const products = await productModel.getAll()
      expect(products.length).toBe(2)
    })

    it('GetProduct method should return testProduct when called with ID', async () => {
      const returnedProduct = await productModel.getProduct(testProduct.id as string)
      expect(returnedProduct?.id).toBe(testProduct.id)
      expect(returnedProduct?.name).toBe(testProduct.name)
      expect(returnedProduct?.category).toBe(testProduct.category)
      expect(returnedProduct?.description).toBe(testProduct.description)
    })

    it('UpdateProduct method should return a Product with updated attributes', async () => {
      const updatedProduct = await productModel.updateProduct(testProduct.id, {
        ...testProduct,
        name: 'test name Updated',
        price: 15,
        category: 'test category Updated',
        description: 'test description Updated'
      })
      expect(updatedProduct.id).toBe(testProduct.id)
      expect(updatedProduct.name).toBe('test name Updated')
      expect(updatedProduct.category).toBe('test category Updated')
      expect(updatedProduct.description).toBe('test description Updated')
    })

    it('DeleteProduct method should delete product from DB', async () => {
      const deletedProduct = await productModel.deleteProduct(testProduct.id as string)
      expect(deletedProduct.id).toBe(testProduct.id)
    })
  })
})
