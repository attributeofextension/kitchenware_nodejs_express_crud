import { Router } from 'express'
import { container } from 'tsyringe'
import { ProductController } from '../controllers/product.controller'

const router = Router()
const productController = container.resolve(ProductController)

router.get('/', productController.getAllProducts)

export const productRouter = router