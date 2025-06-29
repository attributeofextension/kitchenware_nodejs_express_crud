export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}

// Type for creating a new product
export type CreateProductDTO = Pick<Product, 'name' | 'price' | 'description' | 'imageUrl'>;

// Type for updating an existing product
export type UpdateProductDTO = Partial<CreateProductDTO>;