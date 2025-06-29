// src/pages/Products.tsx
import {useEffect, useState} from 'react';
import {
    Box,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper, Button
} from '@mui/material';
import { ViewList, ViewModule, Add as AddIcon
} from '@mui/icons-material';
import { ProductCard} from "../components/ProductCard.tsx";
import { useNavigate } from 'react-router-dom';
import {useProducts, useProductsActions} from "../contexts/ProductsContext.tsx";
import { ProductFormModal } from '../components/ProductFormModal.tsx';
import type {CreateProductDTO, Product, UpdateProductDTO} from "../types/product.ts";
import {ProductActions} from "../components/ProductActions.tsx";

type ViewMode = 'table' | 'tile';
type ModalMode = 'create' | 'update';

export default function Products() {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState<ViewMode>('table');
    const products = useProducts();
    const actions = useProductsActions();

    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<ModalMode>('create');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        actions.get();
    },[])

    const handleProductClick = (productId: string) => {
        navigate(`/products/${productId}`);
    }

    const handleViewChange = (
        _event: React.MouseEvent<HTMLElement>,
        newMode: ViewMode | null,
    ) => {
        if (newMode !== null) {
            setViewMode(newMode);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    const handleUpdateProduct = async (data: UpdateProductDTO) => {
        if (!selectedProduct?.id) return;
        setIsLoading(true);
        try {
            await actions.update(selectedProduct!.id, data);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to update product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateProduct = async (data: CreateProductDTO) => {
        setIsLoading(true);
        try {
            await actions.create(data);
            setIsModalOpen(false)
        } catch (error) {
            console.error('Failed to create product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleModalSubmit = (data: CreateProductDTO | UpdateProductDTO) => {
        if (modalMode === 'create') {
            return handleCreateProduct(data as CreateProductDTO);
        } else {
            return handleUpdateProduct(data as UpdateProductDTO);
        }
    };

    const handleDeleteProduct = (productId: string) => async () => {
        try {
            await actions.delete(productId);
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    }

    const openCreateModal = () => {
        setModalMode('create');
        setSelectedProduct(undefined);
        setIsModalOpen(true);
    };

    const openUpdateModal = (product: Product) => {
        setModalMode('update');
        setSelectedProduct(product);
        setIsModalOpen(true);
    };


    return (
        <>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4">Products</Typography>
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleViewChange}
                        aria-label="view mode"
                    >
                        <ToggleButton value="table" aria-label="table view">
                            <ViewList />
                        </ToggleButton>
                        <ToggleButton value="tile" aria-label="tile view">
                            <ViewModule />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                {viewMode === 'table' ? (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell align={"right"}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.id} onClick={() => handleProductClick(product.id)} sx={{ cursor: 'pointer'}} hover>
                                        <TableCell>{product.id}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{formatPrice(product.price)}</TableCell>
                                        <TableCell>{product.description}</TableCell>
                                        <TableCell align={"right"}><ProductActions onEdit={() => openUpdateModal(product)} onDelete={handleDeleteProduct(product.id)} iconSize={"small"} /></TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Grid container spacing={3}>
                        {products.map((product) => (
                            // @ts-ignore - tried many things to fix this ridiculous error
                            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                                <ProductCard product={product} onClick={() => handleProductClick(product.id)} onEdit={() => openUpdateModal(product)} onDelete={handleDeleteProduct(product.id)}/>
                            </Grid>
                        ))}
                    </Grid>
                )}
                <Box sx={{
                    mt: 4, // Increased top margin (mt: 4 equals to 32px in the default MUI theme)
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'flex-end' // Aligns the button to the right
                }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={openCreateModal}
                    >
                        Add New Product
                    </Button>
                </Box>
            </Box>
            <ProductFormModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                product={selectedProduct}
                onSubmit={handleModalSubmit}
                isLoading={isLoading}
            />

        </>

    );
}