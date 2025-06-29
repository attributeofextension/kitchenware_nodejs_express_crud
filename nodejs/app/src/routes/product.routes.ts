import { Router } from 'express'
import { container } from 'tsyringe'
import { ProductController } from '../controllers/product.controller'

const router = Router()
const productController = container.resolve(ProductController)

router.get('/', productController.getAll)
router.get('/:id', productController.getById)
router.post('/', productController.create)
router.patch('/:id', productController.update)
router.delete('/:id', productController.delete)

export const productRouter = router