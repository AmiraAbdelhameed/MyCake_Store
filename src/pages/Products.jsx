import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/productsSlice';
import { addProductToCart } from '../Redux/cartSlice';
import {
    Box,
    Typography,
    Button,
    ButtonGroup,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import MySnackbar from '../components/MySnackbar';
import { current } from '@reduxjs/toolkit';
import useAuth from '../Hooks/useAuth';

const Products = () => {
    const dispatch = useDispatch();
    const { items: products, status, error } = useSelector((state) => state.products);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const currentUser = useAuth();
    useLayoutEffect(() => {
        if (status === 'idle') dispatch(fetchProducts());
    }, [dispatch, status]);


    const categories = ['all', ...new Set(products.map((p) => p.category))];


    const filteredProducts =
        selectedCategory === 'all'
            ? products
            : products.filter((p) => p.category === selectedCategory);
    const handleAddToCart = (product) => {
        if (!currentUser || !currentUser.uid) {
            alert('You must be logged in to add to cart.');
            return;
        }
        dispatch(addProductToCart({
            id: product.id,
            productName: product.productName,
            price: product.price,
            image: product.images?.[0],
            userId: currentUser.uid,
        }));
        setSnackbarOpen(true);
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    return (
        <Box sx={{ mt: 8, minHeight: '80vh', p: 2 }}>
            <Typography variant="h4" textAlign="center" mt={2}>
                Our Products
            </Typography>

            {/* Category Filter Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, flexWrap: 'wrap', gap: 1 }}>
                <ButtonGroup variant="outlined">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            variant={selectedCategory === category ? 'contained' : 'outlined'}
                        >
                            {category}
                        </Button>
                    ))}
                </ButtonGroup>
            </Box>

            {/* Product Grid */}
            {status === 'loading' && <Typography textAlign="center" mt={4}>Loading...</Typography>}
            {status === 'failed' && <Typography textAlign="center" mt={4}>Error: {error}</Typography>}

            {status === 'succeeded' && (

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 3,
                        mt: 4,
                    }}
                >
                    {filteredProducts
                        .map((product) => (
                            <Box
                                key={product.id}
                                sx={{
                                    width: 220,
                                    border: '1px solid #eee',
                                    borderRadius: 1,
                                    overflow: 'hidden',
                                    boxShadow: 2,
                                    backgroundColor: '#fff',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-between',
                                    mb: 2,

                                    '&:hover': {
                                        boxShadow: 4,
                                        transform: 'scale(1.02)',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                    },

                                }}
                            >
                                <Box component={NavLink} to={`/products/${product.id}`} sx={{
                                    width: '100%',
                                    height: 150,
                                    objectFit: 'cover',
                                    borderRadius: 8,
                                }}>
                                    <img
                                        src={product.images[0] || '/placeholder.jpg'}
                                        alt={product.productName}
                                        style={{
                                            width: '100%',
                                            height: 150,
                                            objectFit: 'cover',
                                            borderRadius: 8,
                                        }}
                                    />
                                </Box>
                                <Typography variant="subtitle1" sx={{ mt: 1, p: 1, fontWeight: 'bold', textTransform: 'capitalize' }}>
                                    {product.productName}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ mt: 1, p: 1, color: 'text.secondary' }}>
                                    {product.productDescription}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
                                    ${product.price}
                                </Typography>
                                <Button
                                    onClick={() => handleAddToCart(product)}
                                    variant='contained'
                                    sx={{ width: '100%' }}
                                    disabled={!currentUser || !currentUser.uid}
                                >
                                    Add to Cart
                                </Button>
                            </Box>
                        ))}
                </Box>
            )}
            <MySnackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                content="Product added to cart"
                bgcolor='#c4dfc5'

            />
        </Box>
    );
};

export default Products;
