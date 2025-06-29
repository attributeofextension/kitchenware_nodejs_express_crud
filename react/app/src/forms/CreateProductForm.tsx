// CreateProductForm.tsx
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import { type CreateProductDTO } from '../types/product';

interface CreateProductFormProps {
    onSubmit: (data: CreateProductDTO) => Promise<void>;
    isLoading?: boolean;
}

export const CreateProductForm = ({ onSubmit, isLoading = false }: CreateProductFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateProductDTO>({
        defaultValues: {
            name: '',
            price: 0,
            description: '',
            imageUrl: ''
        }
    });

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Product Name"
                {...register('name', { required: 'Name is required', maxLength: 100 })}
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={isLoading}
            />

            <TextField
                label="Price"
                type="number"
                {...register('price', {
                    required: 'Price is required',
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
                {isLoading ? 'Creating...' : 'Create Product'}
            </Button>
        </Box>
    );
};