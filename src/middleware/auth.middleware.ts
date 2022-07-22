import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import Error from '../interfaces/error.interface'
import config from '../config'

const handleUnauthorizedError = (next: NextFunction) => {
  const error: Error = new Error('Login Error, Please login again')
  error.status = 401
  next(error)
}

const auth = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) return handleUnauthorizedError(next)
    const token = authHeader.split(' ')[1]
    if (!token) return handleUnauthorizedError(next)
    const decode = jwt.verify(token, config.tokenSecret as unknown as string)
    // Failed to authenticate user.
    if (!decode) return handleUnauthorizedError(next)
    next()
  } catch (err) {
    handleUnauthorizedError(next)
  }
}

export default auth
