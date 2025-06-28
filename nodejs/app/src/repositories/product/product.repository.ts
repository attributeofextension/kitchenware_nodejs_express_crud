import { injectable } from "tsyringe"
import { Repository } from "typeorm"
import { AppDataSource } from "../../config/db/database"
import { Product } from "../../entities/product.entity"
import { BaseRepository } from "../base/base.repository"
import { IProductRepository } from "./product.repository.interface"

@injectable()
export class ProductRepository extends BaseRepository<Product> implements IProductRepository {
    private readonly productRepository: Repository<Product>

    constructor() {
        const repository = AppDataSource.getRepository(Product)
        super(repository)
        this.productRepository = repository
    }

    async findByName(name: string): Promise<Product | null> {
        return await this.productRepository.findOne({ where: { name } })
    }
}
