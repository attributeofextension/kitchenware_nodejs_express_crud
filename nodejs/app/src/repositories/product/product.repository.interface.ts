import { IBaseRepository } from "../base/base.repository.interface"
import { Product } from "../../entities/product.entity"

export interface IProductRepository extends IBaseRepository<Product> {
    findByName(name: string): Promise<Product | null>
}
