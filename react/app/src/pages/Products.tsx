// src/pages/Products.tsx
import { useState } from 'react';
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
    Paper,
} from '@mui/material';
import { ViewList, ViewModule } from '@mui/icons-material';
import { ProductCard} from "../components/ProductCard.tsx";
import type {Product} from "../types/product.ts";
import { useNavigate } from 'react-router-dom';


const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Sample Product 1',
        price: 99.99,
        description: 'This is a sample product description',
        imageUrl: 'https://via.placeholder.com/200',
    },
    {
        id: '2',
        name: 'Sample Product 2',
        price: 149.99,
        description: 'Another sample product description',
        imageUrl: 'https://via.placeholder.com/200',
    },
    // Add more mock products as needed
];

type ViewMode = 'table' | 'tile';

export default function Products() {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState<ViewMode>('table');

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

    return (
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{formatPrice(product.price)}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Grid container spacing={3}>
                    {mockProducts.map((product) => (
                        // @ts-ignore - tried many things to fix this ridiculous error
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}