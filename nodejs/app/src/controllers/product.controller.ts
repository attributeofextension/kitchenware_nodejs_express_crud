// src/controllers/product.controller.ts
import { Request, Response } from 'express'
import { injectable, inject } from 'tsyringe'
import { IProductRepository } from '../repositories/product/product.repository.interface'
import {CreateProductDTO, ProductResponseDTO, UpdateProductDTO} from "../interfaces/dtos/product.dto";
import { ApiErrorResponse } from '../types/api.types'
import {ProductService} from "../services/product.service";
import {HttpError} from "../errors/http.error";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";


@injectable()
export class ProductController {
    constructor(
        @inject('IProductRepository')
        private productRepository: IProductRepository,
        @inject('ProductService') private productService: ProductService
    ) {}

    getAll = async (req: Request, res: Response<ProductResponseDTO[] | ApiErrorResponse>): Promise<void>  => {
        try {
            const products = await this.productRepository.findAll()
            const productDTOs = products.map(product => this.productService.mapEntityToDTO(product))
            res.json(productDTOs)
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error })
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const product = await this.productRepository.findOne(id);

            if (!product) {
                throw new HttpError(404, 'Product not found');
            }

            res.json(product);
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new HttpError(500, 'Failed to retrieve product');
        }
    }

    create = async (req: Request, res: Response) => {
        try {

            const productDto = plainToInstance(CreateProductDTO, req.body);
            console.log(productDto);
            const errors = await validate(productDto);

            if (errors.length > 0) {
                throw new HttpError(400, 'Validation failed', errors);
            }

            const existingProduct = await this.productRepository.findByName(productDto.name);
            if (existingProduct) {
                throw new HttpError(409, 'Product with this name already exists');
            }

            const product = await this.productRepository.create(productDto);
            res.status(201).json(product);
        } catch (error) {
            console.error(error);
            if (error instanceof HttpError) {
                throw error;
            }
            throw new HttpError(500, 'Failed to create product');
        }
    };


    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const productDto = plainToInstance(UpdateProductDTO, req.body);
            const errors = await validate(productDto, { skipMissingProperties: true });

            if (errors.length > 0) {
                throw new HttpError(400, 'Validation failed', errors);
            }

            const existingProduct = await this.productRepository.findOne(id);
            if (!existingProduct) {
                throw new HttpError(404, 'Product not found');
            }

            if (productDto.name && productDto.name !== existingProduct.name) {
                const productWithSameName = await this.productRepository.findByName(productDto.name);
                if (productWithSameName) {
                    throw new HttpError(409, 'Product with this name already exists');
                }
            }

            const updatedProduct = await this.productRepository.update(id, productDto);
            res.json(updatedProduct);
        } catch (error) {
            console.error(error);
            if (error instanceof HttpError) {
                throw error;
            }
            throw new HttpError(500, 'Failed to update product');
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const product = await this.productRepository.findOne(id);

            if (!product) {
                throw new HttpError(404, 'Product not found');
            }

            await this.productRepository.softDelete(id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            if (error instanceof HttpError) {
                throw error;
            }
            throw new HttpError(500, 'Failed to delete product');
        }
    };
}