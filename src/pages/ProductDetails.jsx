import React, { useEffect, useLayoutEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Box, Typography, CircularProgress, Button, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateQuantity, addProductToCart } from '../Redux/cartSlice';
import MySnackbar from '../components/MySnackbar';
import { useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/productsSlice';
import useAuth from '../Hooks/useAuth';
const ProductDetails = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const currentUser = useAuth();
    const dispatch = useDispatch();
    const { items: products, status } = useSelector((state) => state.products);

    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
      };
    useLayoutEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log('No such product!');
                }
            } catch (err) {
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };
dispatch(fetchProducts());
        fetchProduct();
    }, [dispatch, id]);
    const handleAddToCart = () => {
        if (!currentUser || !currentUser.uid) {
            alert('You must be logged in to add to cart.');
            return;
        }
        dispatch(addProductToCart({
            id: product.id,
            productName: product.productName,
            price: product.price,
            image: product.images?.[0],
            quantity: quantity, 
            userId: currentUser.uid,
        }));
        setSnackbarOpen(true);
      };
    const handleSnackbarClose = () => setSnackbarOpen(false);

    if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
    if (!product) return <Typography textAlign="center" mt={4}>Product not found.</Typography>;

    return (
        <Container>
            <Box sx={{
                mx: 'auto', mt: 8, p: 2, display: 'flex' ,   flexDirection: {
                    xs: 'column', 
                    sm: 'row',   
                },
}}>
            <Box
                component="img"
                src={product.images?.[0] || '/placeholder.jpg'}
                alt={product.productName}
                sx={{
                    width: { xs: '100%', sm: "50%" },
                    height: 400,
                    objectFit: 'cover',
                    borderRadius: 2,
                }}
            />
            <Box
            sx={{ width: { xs: '100%', sm: "50%" }, paddingLeft: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
                <Typography variant="h4" mb={2} sx={{fontWeight:'bold' , textTransform:'capitalize'}}>{product.productName}</Typography>
                <Typography mt={2}>
                    {product.productDescription}
                </Typography>
            <Typography variant="h6" color="text.secondary" mt={2}>
                ${product.price}
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={2}>
                Category: {product.category}
            </Typography>

                    <Box display="flex" alignItems="center" gap={1} mt={2}>
                        <Button onClick={handleDecrement} variant="outlined">-</Button>
                        <Typography>{quantity}</Typography>
                        <Button onClick={handleIncrement} variant="outlined">+</Button>
                    </Box>
            <Button onClick={handleAddToCart} variant="contained" sx={{ mt: 3 }}>
                Add to Cart
            </Button>
            </Box>
        </Box>


            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 3,
                    mt: 4,
                }}
            >
                <Typography variant="h5" sx={{ width: '100%', mb: 2, textAlign: 'center' }}>
                    Related Products    
                </Typography>
                {[...products]
                    .sort(() => 0.5 - Math.random()).slice(0,3)
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
                            <Button onClick={handleAddToCart} variant='contained' sx={{ width: '100%' }}>Add to Cart</Button>
                        </Box>
                    ))}
            </Box>
              <MySnackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                content="Product added to cart"
                bgcolor="#c4dfc5"
              />
        </Container>
    );
};

export default ProductDetails;
