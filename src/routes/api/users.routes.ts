import { Router } from 'express'
import * as controllers from '../../controllers/users.controller'

const usersRoutes = Router()

usersRoutes.get('/', controllers.getAllUsers)

usersRoutes.post('/', controllers.createUser)

export default usersRoutes
