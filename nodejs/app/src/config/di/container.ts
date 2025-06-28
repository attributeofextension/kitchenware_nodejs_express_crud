import { container } from "tsyringe"
import { ProductRepository } from "../../repositories/product/product.repository"
import { IProductRepository } from "../../repositories/product/product.repository.interface"
import {ProductService} from "../../services/product.service";

container.registerSingleton<IProductRepository>(
    "IProductRepository",
    ProductRepository
)
container.register('ProductService', {
    useClass: ProductService
})

export { container }