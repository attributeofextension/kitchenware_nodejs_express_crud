import { api } from './api.service';
import type { Product, CreateProductDTO, UpdateProductDTO } from '../types/product';

export const productService = {
    async get(): Promise<Product[]> {
        return api.get<Product[]>('/products');
    },

    async getById(id: string): Promise<Product> {
        return api.get<Product>(`/products/${id}`);
    },

    async create(product: CreateProductDTO): Promise<Product> {
        return api.post<Product>('/products', product);
    },

    async update(id: string, product: UpdateProductDTO): Promise<Product> {
        return api.patch<Product>(`/products/${id}`, product);
    },

    async delete(id: string): Promise<void> {
        return api.delete(`/products/${id}`);
    },
};