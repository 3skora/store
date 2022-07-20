import { NextFunction, Request, Response } from 'express'
import UserModel from '../models/user.model'

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
