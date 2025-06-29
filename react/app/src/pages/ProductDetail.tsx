import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import {useProduct, useProductsActions} from "../contexts/ProductsContext.tsx";
import {useEffect} from "react";


export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = useProduct(id)
    const actions = useProductsActions()

    useEffect(() => {
        actions.getById(id)
    },[])

    if (!product) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" color="error">
                    Product not found
                </Typography>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/products')}
                    sx={{ mt: 2 }}
                >
                    Back to Products
                </Button>
            </Box>
        );
    }


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