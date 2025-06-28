// src/controllers/product.controller.ts
import { Request, Response } from 'express'
import { injectable, inject } from 'tsyringe'
import { IProductRepository } from '../repositories/product/product.repository.interface'
import {ProductResponseDTO} from "../interfaces/dtos/product.dto";
import { ApiErrorResponse } from '../types/api.types'
import {ProductService} from "../services/product.service";


@injectable()
export class ProductController {
    constructor(
        @inject('IProductRepository')
        private productRepository: IProductRepository,
        @inject('ProductService') private productService: ProductService
    ) {}

    getAllProducts = async (req: Request, res: Response<ProductResponseDTO[] | ApiErrorResponse>): Promise<void>  => {
        try {
            const products = await this.productRepository.findAll()
            const productDTOs = products.map(product => this.productService.mapEntityToDTO(product))
            res.json(productDTOs)
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error })
        }
    }
}