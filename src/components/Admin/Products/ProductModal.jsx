import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    IconButton,
    Grid,
    CircularProgress,
    Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { db } from '../../../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const ProductModal = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        status: 'active',
        category: 'cake',
        price: '',
        quantity: '',
    });

    const [imageInputs, setImageInputs] = useState([null]);
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    const handleImageChange = (index, file) => {
        const updatedInputs = [...imageInputs];
        updatedInputs[index] = file;
        setImageInputs(updatedInputs);
    };

    const addImageField = () => {
        setImageInputs([...imageInputs, null]);
    };

    const uploadImages = async () => {
        const urls = [];
        setUploading(true);

        for (let i = 0; i < imageInputs.length; i++) {
            const file = imageInputs[i];
            if (!file) continue;

            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'productImages');

            try {
                const res = await axios.post(
                    'https://api.cloudinary.com/v1_1/dnudxplhw/image/upload',
                    formData
                );
                urls.push(res.data.secure_url);
            } catch (err) {
                console.error(`Image ${i + 1} upload failed`, err);
                alert(`Image ${i + 1} upload failed.`);
                setUploading(false);
                return null;
            }
        }

        setUploading(false);
        return urls;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imageURLs = await uploadImages();
        if (!imageURLs) return;

        try {
            await addDoc(collection(db, 'products'), {
                ...formData,
                images: imageURLs,
                createdAt: Timestamp.now(),
            });
            alert('Product added successfully!');
            handleClose();
        } catch (err) {
            console.error('Error saving product:', err);
            alert('Failed to save product');
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFormData({
            productName: '',
            productDescription: '',
            status: 'active',
            category: 'cake',
            price: '',
            quantity: '',
        });
        setImageInputs([null]);
    };

    return (
        <>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
                sx={{ mb: 2 }}
            >
                Add Product
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Add New Product</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent dividers>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Product Name"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Price"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    name="productDescription"
                                    value={formData.productDescription}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline
                                    rows={3}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    label="Status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="in active">In Active</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    label="Category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    <MenuItem value="cake">Cake</MenuItem>
                                    <MenuItem value="cupcake">Cupcake</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Quantity"
                                    name="quantity"
                                    type="number"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Box>
                                    {imageInputs.map((_, index) => (
                                        <Box key={index} sx={{ mb: 1 }}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                required={index === 0}
                                                onChange={(e) =>
                                                    handleImageChange(index, e.target.files[0])
                                                }
                                            />
                                        </Box>
                                    ))}
                                    <Button variant="outlined" onClick={addImageField}>
                                        Add Another Image
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" variant="contained" disabled={uploading}>
                            {uploading ? (
                                <>
                                    <CircularProgress size={20} sx={{ mr: 1 }} />
                                    Uploading...
                                </>
                            ) : (
                                'Add Product'
                            )}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default ProductModal;
