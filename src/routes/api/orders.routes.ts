import { Router } from 'express'
import * as controllers from '../../controllers/orders.controller'
import auth from '../../middleware/auth.middleware'

const ordersRoutes = Router()
// /api/orders/..
ordersRoutes.post('/', auth, controllers.createOrder)
ordersRoutes.get('/', auth, controllers.getAllOrders)
ordersRoutes.get('/:id', auth, controllers.getOrder)
ordersRoutes.get('/users/:id', auth, controllers.getOrdersOfUser)
ordersRoutes.patch('/:id', auth, controllers.updateOrder)
ordersRoutes.delete('/:id', auth, controllers.deleteOrder)
export default ordersRoutes
