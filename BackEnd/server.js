// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const Product = require('./models/Product');

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://localhost/ecommerce', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('Connected to MongoDB'));

// app.get('/api/products', async (req, res) => {
//     const products = await Product.find();
//     res.json(products);
// });

// app.post('/api/products', async (req, res) => {
//     const product = new Product(req.body);
//     await product.save();
//     res.json(product);
// });

// app.listen(5000, () => console.log('Server running on port 5000'));