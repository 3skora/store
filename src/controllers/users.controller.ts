import { NextFunction, Request, Response } from 'express'
import UserModel from '../models/user.model'
import User from '../types/user.type'

const userModel = new UserModel()

export const helloUser = (req: Request, res: Response) => {
  res.json({ message: 'hello from users' })
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //validate req.body first
    const newUser = await userModel.create(req.body)
    res.json({
      status: 'success',
      message: `user ${newUser.user_name} created successfully`,
      data: { ...newUser }
    })
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //validate req.body first
    const allUsers = await userModel.getAll()
    res.json({
      status: 'success',
      message: `All users retrieved successfully`,
      data: allUsers
    })
  } catch (error) {
    next(error)
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const user = await userModel.getUser(id)
    res.json({
      status: 'success',
      message: `User ${id} retrieved successfully`,
      data: user
    })
  } catch (error) {
    next(error)
  }
}

export const updateUserPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { password } = req.body
    const updatedUser = await userModel.updateUserPassword(id, password as string)
    res.json({
      status: 'success',
      message: `Password of user ${id} updated successfully`,
      data: updatedUser
    })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const foundUser = await userModel.getUser(id)
    console.log('🚀 ~ file: users.controller.ts ~ line 72 ~ updateUser ~ foundUser', foundUser)
    const updatedValues: User = { ...foundUser, ...req.body }
    console.log(
      '🚀 ~ file: users.controller.ts ~ line 73 ~ updateUser ~ updatedValues',
      updatedValues
    )
    //validate req.body first
    const updatedUser = await userModel.updateUser(id, updatedValues)
    console.log('🚀 ~ file: users.controller.ts ~ line 72 ~ updateUser ~ updatedUser', updatedUser)
    res.json({
      status: 'success',
      message: `User ${id} updated successfully`,
      data: updatedUser
    })
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const deletedUser = await userModel.deleteUser(id)
    res.json({
      status: 'success',
      message: `User ${id} deleted successfully`,
      data: deletedUser
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.params
    const user = await userModel.login(email, password)
    //HANDLE TOKEN HERE=====
    res.json({
      status: 'success',
      message: `Logged in`,
      data: user
    })
  } catch (error) {
    next(error)
  }
}
