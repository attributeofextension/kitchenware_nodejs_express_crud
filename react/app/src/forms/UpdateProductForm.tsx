import { useForm } from 'react-hook-form';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import { type UpdateProductDTO, type Product } from '../types/product';

interface UpdateProductFormProps {
    product: Product;
    onSubmit: (data: UpdateProductDTO) => Promise<void>;
    isLoading?: boolean;
}

export const UpdateProductForm = ({ product, onSubmit, isLoading = false }: UpdateProductFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<UpdateProductDTO>({
        defaultValues: {
            name: product.name,
            price: product.price,
            description: product.description,
            imageUrl: product.imageUrl
        }
    });

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Product Name"
                {...register('name', { maxLength: 100 })}
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={isLoading}
            />

            <TextField
                label="Price"
                type="number"
                {...register('price', {
                    min: { value: 0, message: 'Price must be positive' },
                    valueAsNumber: true
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
                disabled={isLoading}
            />

            <TextField
                label="Description"
                multiline
                rows={4}
                {...register('description', { maxLength: 1000 })}
                error={!!errors.description}
                helperText={errors.description?.message}
                disabled={isLoading}
            />

            <TextField
                label="Image URL"
                {...register('imageUrl', {
                    pattern: {
                        value: /^(https?:\/\/)?.+/i,
                        message: 'Must be a valid URL'
                    }
                })}
                error={!!errors.imageUrl}
                helperText={errors.imageUrl?.message}
                disabled={isLoading}
            />

            <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
                {isLoading ? 'Updating...' : 'Update Product'}
            </Button>
        </Box>
    );
};
