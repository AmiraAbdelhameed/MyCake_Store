import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    CardMedia,
    Box,
} from '@mui/material';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editFormData, setEditFormData] = useState({
        productName: '',
        productDescription: '',
        price: '',
        category: '',
        quantity: '',
    });
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);

    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const productsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productsData);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, 'products', id));
            alert('Product deleted!');
            fetchProducts();
        } catch (err) {
            console.error('Error deleting product:', err);
        }
    };

    const openEditDialog = (product) => {
        setEditingProductId(product.id);
        setEditFormData({
            productName: product.productName,
            productDescription: product.productDescription,
            price: product.price,
            category: product.category,
            quantity: product.quantity,
        });
        setOpenEditModal(true);
    };

    const closeEditDialog = () => {
        setOpenEditModal(false);
        setEditingProductId(null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            await updateDoc(doc(db, 'products', editingProductId), {
                ...editFormData,
                price: Number(editFormData.price),
                quantity: Number(editFormData.quantity),
            });
            alert('Product updated!');
            closeEditDialog();
            fetchProducts();
        } catch (err) {
            console.error('Error updating product:', err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Product List
            </Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                            {product.images?.[0] && (
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={product.images[0]}
                                    alt={product.productName}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h6">{product.productName}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.productDescription}
                                </Typography>
                                <Typography sx={{ mt: 1 }}>
                                    <strong>Price:</strong> ${product.price}
                                </Typography>
                                <Typography>
                                    <strong>Category:</strong> {product.category}
                                </Typography>
                                <Typography>
                                    <strong>Quantity:</strong> {product.quantity}
                                </Typography>
                            </CardContent>

                            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => openEditDialog(product)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Edit Product Modal */}
            <Dialog open={openEditModal} onClose={closeEditDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Product Name"
                                name="productName"
                                fullWidth
                                value={editFormData.productName}
                                onChange={handleEditChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                name="productDescription"
                                fullWidth
                                multiline
                                rows={3}
                                value={editFormData.productDescription}
                                onChange={handleEditChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Price"
                                name="price"
                                type="number"
                                fullWidth
                                value={editFormData.price}
                                onChange={handleEditChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Quantity"
                                name="quantity"
                                type="number"
                                fullWidth
                                value={editFormData.quantity}
                                onChange={handleEditChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Category"
                                name="category"
                                fullWidth
                                value={editFormData.category}
                                onChange={handleEditChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeEditDialog}>Cancel</Button>
                    <Button variant="contained" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProductList;
