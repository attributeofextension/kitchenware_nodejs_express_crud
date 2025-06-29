// src/store/AppProvider.tsx
import { type ReactNode } from 'react';
import { ProductsProvider } from './ProductsContext';

export function AppStateProvider({ children }: { children: ReactNode }) {
    return (
        <ProductsProvider>
            {children}
        </ProductsProvider>
    );
}