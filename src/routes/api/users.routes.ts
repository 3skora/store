import { Router } from 'express'
import * as controllers from '../../controllers/users.controller'

const usersRoutes = Router()
// /api/users/..
usersRoutes.post('/', controllers.createUser)
usersRoutes.post('/login', controllers.login)
usersRoutes.get('/', controllers.getAllUsers)
usersRoutes.get('/:id', controllers.getUser)
usersRoutes.patch('/:id', controllers.updateUser)
usersRoutes.patch('/:id/password', controllers.updateUserPassword)
usersRoutes.delete('/:id', controllers.deleteUser)
export default usersRoutes
