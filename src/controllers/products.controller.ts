import { NextFunction, Request, Response } from 'express'
import Product from '../types/product.type'
import Error from '../interfaces/error.interface'
import ProductModel from '../models/product.model'

const productModel = new ProductModel()

const handleError = (message: string, status: number, next: NextFunction) => {
  const error: Error = new Error(message)
  error.status = status
  next(error)
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //validate req.body first
    const newProduct = await productModel.create(req.body)
    res.json({
      status: 'success',
      message: `Product ${newProduct.name} created successfully`,
      data: { ...newProduct }
    })
  } catch (error) {
    next(error)
  }
}

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //validate req.body first
    const { category } = req.query
    let allProducts
    !category
      ? (allProducts = await productModel.getAll())
      : (allProducts = await productModel.getProductByCategory(category as string))

    if (!allProducts) throw new Error()
    res.json({
      status: 'success',
      message: `All Products retrieved successfully`,
      data: allProducts
    })
  } catch (error) {
    handleError(`Products Not Found : No such category`, 404, next)
  }
}

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const Product = await productModel.getProduct(id)
    if (!Product) throw new Error()

    return res.json({
      status: 'success',
      message: `Product ${id} retrieved successfully`,
      data: Product
    })
  } catch (error) {
    handleError(`Product Not Found`, 404, next)
  }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const foundProduct = await productModel.getProduct(id)
    const updatedValues: Product = { ...foundProduct, ...req.body }

    //validate req.body first
    const updatedProduct = await productModel.updateProduct(id, updatedValues)
    res.json({
      status: 'success',
      message: `Product ${id} updated successfully`,
      data: updatedProduct
    })
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const deletedProduct = await productModel.deleteProduct(id)
    res.json({
      status: 'success',
      message: `Product ${id} deleted successfully`,
      data: deletedProduct
    })
  } catch (error) {
    next(error)
  }
}
