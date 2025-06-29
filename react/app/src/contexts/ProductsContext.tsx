import React, { createContext, useContext, useState } from 'react';
import type { Product } from '../types/product';

const ProductsContext = createContext<Product[] | undefined>(undefined);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);

    return (
        <ProductsContext.Provider value={products}>
            <ProductsActionsProvider setProducts={setProducts}>
                {children}
            </ProductsActionsProvider>
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
}

export function useProduct(id?: string) {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProduct must be used within a ProductsProvider');
    }
    return context.find(p => p.id === id);
}


import type { CreateProductDTO, UpdateProductDTO } from '../types/product';
import { productService } from '../services/product.service';

interface ProductsActions {
    get: () => Promise<void>;
    getById: (id?: string) => Promise<void>;
    create: (data: CreateProductDTO) => Promise<void>;
    update: (id: string, data: UpdateProductDTO) => Promise<void>;
    delete: (id: string) => Promise<void>;
}

const ProductsActionsContext = createContext<ProductsActions | undefined>(undefined);

interface ProductsActionsProviderProps {
    children: React.ReactNode;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

function ProductsActionsProvider({ children, setProducts }: ProductsActionsProviderProps) {
    const actions: ProductsActions = {
        get: async () => {
            const products = await productService.get();
            setProducts(products);
        },

        getById: async (id?: string) => {
            if (!id) return;
            const product = await productService.getById(id);
            setProducts(prev => {
                const index = prev.findIndex(p => p.id === id);
                if (index === -1) {
                    return [...prev, product];
                }
                const newProducts = [...prev];
                newProducts[index] = product;
                return newProducts;
            });
        },

        create: async (data: CreateProductDTO) => {
            const newProduct = await productService.create(data);
            setProducts(prev => [...prev, newProduct]);
        },

        update: async (id: string, data: UpdateProductDTO) => {
            const updatedProduct = await productService.update(id, data);
            setProducts(prev =>
                prev.map(p => p.id === id ? updatedProduct : p)
            );
        },

        delete: async (id: string) => {
            await productService.delete(id);
            setProducts(prev => prev.filter(p => p.id !== id));
        }
    };

    return (
        <ProductsActionsContext.Provider value={actions}>
            {children}
        </ProductsActionsContext.Provider>
    );
}

export function useProductsActions() {
    const context = useContext(ProductsActionsContext);
    if (!context) {
        throw new Error('useProductsActions must be used within a ProductsActionsProvider');
    }
    return context;
}