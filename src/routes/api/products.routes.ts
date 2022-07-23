import { Router } from 'express'
import * as controllers from '../../controllers/products.controller'
import auth from '../../middleware/auth.middleware'

const productsRoutes = Router()
// /api/products/..
productsRoutes.post('/', auth, controllers.createProduct)
productsRoutes.get('/', controllers.getAllProducts)
productsRoutes.get('/:id', controllers.getProduct)
productsRoutes.patch('/:id', auth, controllers.updateProduct)
productsRoutes.delete('/:id', auth, controllers.deleteProduct)
export default productsRoutes
