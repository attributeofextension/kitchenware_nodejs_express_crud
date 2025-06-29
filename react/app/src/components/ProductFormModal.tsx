// components/ProductFormModal.tsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { CreateProductForm } from '../forms/CreateProductForm';
import { UpdateProductForm } from '../forms/UpdateProductForm';
import type { Product, CreateProductDTO, UpdateProductDTO } from '../types/product';

interface ProductFormModalProps {
    open: boolean;
    onClose: () => void;
    mode: 'create' | 'update';
    product?: Product;
    onSubmit: (data: CreateProductDTO | UpdateProductDTO) => Promise<void>;
    isLoading?: boolean;
}

export const ProductFormModal = ({
                                     open,
                                     onClose,
                                     mode,
                                     product,
                                     onSubmit,
                                     isLoading
                                 }: ProductFormModalProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                {mode === 'create' ? 'Create New Product' : 'Edit Product'}
            </DialogTitle>
            <DialogContent>
                {mode === 'create' ? (
                    <CreateProductForm
                        onSubmit={async (data) => {
                            await onSubmit(data);
                            onClose();
                        }}
                        isLoading={isLoading}
                    />
                ) : (
                    <UpdateProductForm
                        product={product!}
                        onSubmit={async (data) => {
                            await onSubmit(data);
                            onClose();
                        }}
                        isLoading={isLoading}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={isLoading}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};