import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import UserModel from '../models/user.model'
import User from '../types/user.type'
import Error from '../interfaces/error.interface'

const userModel = new UserModel()

const handleError = (message: string, status: number, next: NextFunction) => {
  const error: Error = new Error(message)
  error.status = status
  next(error)
}

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
    if (!user) throw new Error()

    return res.json({
      status: 'success',
      message: `User ${id} retrieved successfully`,
      data: user
    })
  } catch (error) {
    handleError(`User Not Found`, 404, next)
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
    const updatedValues: User = { ...foundUser, ...req.body }

    //validate req.body first
    const updatedUser = await userModel.updateUser(id, updatedValues)
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
    const { email, password } = req.body
    const userInfo = await userModel.login(email, password)
    if (!userInfo) throw new Error(`email or password does not match`)
    const token = jwt.sign(userInfo, config.tokenSecret as string)
    req.headers["cookie"] = token
    return res.json({
      status: 'success',
      message: `Logged in `,
      data: { id: (userInfo as User).id, token }
    })
  } catch (error) {
    handleError(`email or password does not match`, 401, next)
    // return res.status(401).json((error as Error).message)
  }
}
