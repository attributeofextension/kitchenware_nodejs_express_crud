// src/components/ProductCard.tsx
import {Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type {Product} from '../types/product';


interface ProductCardProps {
    product: Product;
    onClick: () => void;
    onEdit: () => void;
    onDelete: () => void;

}

const DEFAULT_IMAGE = '/vite.svg'; // We'll assume this exists in the public folder

export function ProductCard({ product, onClick, onEdit, onDelete }: ProductCardProps) {
    const { name, price, imageUrl } = product;

    const handleAction = (action: () => void) => (event: React.MouseEvent) => {
        event.stopPropagation();
        action();
    };


    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <Card onClick={onClick} sx={{
            cursor: 'pointer',
            position: 'relative',
            '&:hover .action-buttons': {
                visibility: 'visible',
                opacity: 1,
            }
        }}>
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
            {/* Action buttons overlay */}
            <Box
                className="action-buttons"
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: 1,
                    display: 'flex',
                    gap: 0.5
                }}
            >
                <IconButton
                    size="small"
                    onClick={handleAction(onEdit)}
                    sx={{ color: 'primary.main' }}
                >
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={handleAction(onDelete)}
                    sx={{ color: 'error.main' }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Box>

        </Card>
    );
}