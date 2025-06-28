// src/pages/ProductDetail.tsx
import { Box, Typography, Paper } from '@mui/material';
import type { Product } from '../types/product';

interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
    return (
        <Paper sx={{ p: 3, m: 2 }}>
            <Box>
                {product.imageUrl && (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ maxWidth: '300px', height: 'auto' }}
                    />
                )}
                <Typography variant="h4" component="h1" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                    ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                    {product.description}
                </Typography>
            </Box>
        </Paper>
    );
}