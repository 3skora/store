import { Router } from 'express'
import * as controllers from '../../controllers/users.controller'
import auth from '../../middleware/auth.middleware'

const usersRoutes = Router()
// /api/users/..
usersRoutes.post('/login', controllers.login)
usersRoutes.post('/', controllers.createUser)
usersRoutes.get('/', auth, controllers.getAllUsers)
usersRoutes.get('/:id', auth, controllers.getUser)
usersRoutes.patch('/:id', auth, controllers.updateUser)
usersRoutes.patch('/:id/password', auth, controllers.updateUserPassword)
usersRoutes.delete('/:id', auth, controllers.deleteUser)
export default usersRoutes
