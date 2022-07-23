import { NextFunction, Request, Response } from 'express'
import Error from '../interfaces/error.interface'
import Order from '../types/order.type'
import OrderModel from '../models/order.model'

const orderModel = new OrderModel()

const handleError = (message: string, status: number, next: NextFunction) => {
  const error: Error = new Error(message)
  error.status = status
  next(error)
}

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //validate req.body first
    const newOrder = await orderModel.create(req.body)
    res.json({
      status: 'success',
      message: `Order ${newOrder.id} created successfully`,
      data: { ...newOrder }
    })
  } catch (error) {
    next(error)
  }
}

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //validate req.body first
    const allOrders = await orderModel.getAll()

    if (!allOrders) throw new Error()
    res.json({
      status: 'success',
      message: `All Orders retrieved successfully`,
      data: allOrders
    })
  } catch (error) {
    handleError(`Orders Not Found`, 404, next)
  }
}
// export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     //validate req.body first
//     const { category } = req.query
//     let allOrders
//     !category
//       ? (allOrders = await orderModel.getAll())
//       : (allOrders = await orderModel.getOrderByCategory(category as string))

//     if (!allOrders) throw new Error()
//     res.json({
//       status: 'success',
//       message: `All Orders retrieved successfully`,
//       data: allOrders
//     })
//   } catch (error) {
//     handleError(`Orders Not Found : No such category`, 404, next)
//   }
// }

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const Order = await orderModel.getOrder(id)
    if (!Order) throw new Error()

    return res.json({
      status: 'success',
      message: `Order ${id} retrieved successfully`,
      data: Order
    })
  } catch (error) {
    handleError(`Order Not Found`, 404, next)
  }
}

export const getOrdersOfUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { status } = req.query
    const Order = await orderModel.getOrdersOfUser(id, status as unknown as string)
    if (!Order) throw new Error()

    return res.json({
      status: 'success',
      message: `Order ${id} retrieved successfully`,
      data: Order
    })
  } catch (error) {
    handleError(`Order Not Found`, 404, next)
  }
}

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const foundOrder = await orderModel.getOrder(id)
    const updatedValues: Order = { ...foundOrder, ...req.body }

    //validate req.body first
    const updatedOrder = await orderModel.updateOrderStatus(id, updatedValues)
    res.json({
      status: 'success',
      message: `Order ${id} updated successfully`,
      data: updatedOrder
    })
  } catch (error) {
    next(error)
  }
}

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const deletedOrder = await orderModel.deleteOrder(id)
    res.json({
      status: 'success',
      message: `Order ${id} deleted successfully`,
      data: deletedOrder
    })
  } catch (error) {
    next(error)
  }
}
