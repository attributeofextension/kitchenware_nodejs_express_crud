// src/components/ProductCard.tsx
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import type {Product} from '../types/product';

interface ProductCardProps {
    product: Product;
}

const DEFAULT_IMAGE = '/vite.svg'; // We'll assume this exists in the public folder

export function ProductCard({ product }: ProductCardProps) {
    const { name, price, imageUrl } = product;

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <Card>
            <CardMedia
                component="img"
                height={200}
                image={imageUrl || DEFAULT_IMAGE}
                alt={name}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== DEFAULT_IMAGE) {
                        target.src = DEFAULT_IMAGE;
                    }
                }}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {name}
                </Typography>
                <Typography variant="h6" color="primary">
                    {formatPrice(price)}
                </Typography>
            </CardContent>
        </Card>
    );
}