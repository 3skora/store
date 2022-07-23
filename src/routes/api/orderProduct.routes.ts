import { Router } from 'express'
import * as controllers from '../../controllers/orderProduct.controller'
import auth from '../../middleware/auth.middleware'

const orderProductRoutes = Router()
// /api/orderProduct/..
orderProductRoutes.post('/', auth, controllers.createOrderProduct)
orderProductRoutes.get('/', auth, controllers.getAllOrderProducts)
orderProductRoutes.get('/:id', auth, controllers.getOrderProduct)
orderProductRoutes.patch('/:id', auth, controllers.updateOrderProductQuantity)
orderProductRoutes.delete('/:id', auth, controllers.deleteOrderProduct)
export default orderProductRoutes
