import { Box, Divider, Typography, Button } from '@mui/material'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { fetchCartItems, removeFromCart } from '../Redux/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
const Cart = () => {
    const dispatch = useDispatch();
    const { items: cart, status, error } = useSelector((state) => state.cart);
    useLayoutEffect(() => {
        if (status === 'idle') dispatch(fetchCartItems());
    }, [dispatch, status]);

    return (
        <>
            <Box sx={{ minHeight: '80vh', bgcolor: '#f9f9f9', py: 4 }}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
                    My Cart
                </Typography>

                {status === 'loading' && <Typography textAlign="center">Loading...</Typography>}
                {status === 'failed' && <Typography textAlign="center">Error: {error}</Typography>}

                {status === 'succeeded' && (
                    <>
                        {cart.length > 0 ? (
                            <>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                                    {cart.map((product) => (
                                        <Box
                                            key={product.id}
                                            sx={{
                                                width: { xs: '90%', md: '80%' },
                                                display: 'flex',
                                                flexDirection: { xs: 'column', sm: 'row' },
                                                bgcolor: '#fff',
                                                borderRadius: 2,
                                                boxShadow: 2,
                                                overflow: 'hidden',
                                                p: 2,
                                            }}
                                        >
                                            {/* Image Section */}
                                            <Box
                                                component={NavLink}
                                                to={`/products/${product.id}`}
                                                sx={{
                                                    width: { xs: '100%', sm: '40%' },
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <img
                                                    src={product.image || '/placeholder.jpg'}
                                                    alt={product.productName}
                                                    style={{
                                                        width: '100%',
                                                        maxHeight: 200,
                                                        objectFit: 'cover',
                                                        borderRadius: 8,
                                                    }}
                                                />
                                            </Box>

                                            {/* Details Section */}
                                            <Box sx={{ width: { xs: '100%', sm: '60%' }, p: 2 }}>
                                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                                    {product.productName}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                                    {product.productDescription}
                                                </Typography>
                                                <Typography variant="subtitle1" fontWeight="500" sx={{ mt: 1 }}>
                                                    Price: ${product.price}
                                                </Typography>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    Quantity: {product.quantity}
                                                </Typography>
                                                <Typography variant="subtitle1" fontWeight="600" sx={{ mt: 1 }}>
                                                    Total: ${(product.price * product.quantity).toFixed(2)}
                                                </Typography>

                                                <Box sx={{ mt: 2 }}>
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        size="small"
                                                        onClick={() => dispatch(removeFromCart(product.id))}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>

                                {/* Cart Total Section */}
                                <Divider sx={{ my: 4 }} />
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h5" fontWeight="bold">
                                        Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        color="primary"
                                        sx={{ mt: 2, px: 6, py: 1.5 }}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            <Typography textAlign="center" mt={4}>
                                Your cart is empty
                            </Typography>
                        )}
                    </>
                )}
            </Box>
        </>
    )
}

export default Cart
