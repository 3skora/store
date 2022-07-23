import { NextFunction, Request, Response } from 'express'
import Error from '../interfaces/error.interface'
import OrderProduct from '../types/orderProduct.type'
import OrderProductModel from '../models/orderProduct.model'

const orderProductModel = new OrderProductModel()

const handleError = (message: string, status: number, next: NextFunction) => {
  const error: Error = new Error(message)
  error.status = status
  next(error)
}

export const createOrderProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //validate req.body first
    const newOrderProduct = await orderProductModel.create(req.body)
    res.json({
      status: 'success',
      message: `OrderProduct ${newOrderProduct.id} created successfully`,
      data: { ...newOrderProduct }
    })
  } catch (error) {
    next(error)
  }
}

export const getAllOrderProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //validate req.body first
    const allOrderProducts = await orderProductModel.getAll()

    if (!allOrderProducts) throw new Error()
    res.json({
      status: 'success',
      message: `All OrderProducts retrieved successfully`,
      data: allOrderProducts
    })
  } catch (error) {
    handleError(`OrderProducts Not Found`, 404, next)
  }
}

export const getOrderProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const OrderProduct = await orderProductModel.getOrderProduct(id)
    if (!OrderProduct) throw new Error()

    return res.json({
      status: 'success',
      message: `OrderProduct ${id} retrieved successfully`,
      data: OrderProduct
    })
  } catch (error) {
    handleError(`OrderProduct Not Found`, 404, next)
  }
}

// export const getOrderProductsOfUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { id } = req.params
//     const { status } = req.query
//     const OrderProduct = await orderProductModel.(id, status as unknown as string)
//     if (!OrderProduct) throw new Error()

//     return res.json({
//       status: 'success',
//       message: `OrderProduct ${id} retrieved successfully`,
//       data: OrderProduct
//     })
//   } catch (error) {
//     handleError(`OrderProduct Not Found`, 404, next)
//   }
// }

export const updateOrderProductQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const foundOrderProduct = await orderProductModel.getOrderProduct(id)
    const updatedValues: OrderProduct = { ...foundOrderProduct, ...req.body }

    //validate req.body first
    const updatedOrderProduct = await orderProductModel.updateOrderProductQuantity(
      id,
      updatedValues
    )
    res.json({
      status: 'success',
      message: `OrderProduct ${id} updated successfully`,
      data: updatedOrderProduct
    })
  } catch (error) {
    next(error)
  }
}

export const deleteOrderProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const deletedOrderProduct = await orderProductModel.deleteOrderProduct(id)
    res.json({
      status: 'success',
      message: `OrderProduct ${id} deleted successfully`,
      data: deletedOrderProduct
    })
  } catch (error) {
    next(error)
  }
}
