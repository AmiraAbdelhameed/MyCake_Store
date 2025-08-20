import { Box, Tab, Typography, Tabs, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Redux/productsSlice';
import { addProductToCart } from '../../Redux/cartSlice';
import MySnackbar from '../MySnackbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import useAuth from '../../Hooks/useAuth';

const CategorySection = () => {
  const [value, setValue] = useState('cake');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);
  const currentUser = useAuth();

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [dispatch, status]);

  const categories = [...new Set(products.map((p) => p.category))];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddToCart = (product) => {
    if (!currentUser) return;
    dispatch(addProductToCart({
      id: product.id,
      productName: product.productName,
      price: product.price,
      image: product.images?.[0],
      userId: currentUser.uid,
    }));
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <Box>
      <Typography variant="h4" textAlign="center" mt={4} mb={2}>
        Our Categories
      </Typography>

      {/*  categories */}
      <Box display="flex" justifyContent="center" mb={4}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Category tabs"
        >
          {categories.map((category, i) => (
            <Tab key={i} value={category} label={category} />
          ))}
        </Tabs>
      </Box>

      {/* Products */}
  
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
        spaceBetween={0}
        navigation
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {products
          .filter((product) => product.category === value)
          .map((product) => (
            <SwiperSlide key={product.id}>
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 300,
                  mx: 'auto',
                  my: 4,
                  border: '1px solid #eee',
                  borderRadius: 1,
                  overflow: 'hidden',
                  boxShadow: 2,
                  backgroundColor: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'scale(1.02)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  },
                }}
              >
                <Box
                  component={NavLink}
                  to={`/products/${product.id}`}
                  sx={{
                    width: '100%',
                    height: 150,
                    objectFit: 'cover',
                  }}
                >
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
                <Typography variant="subtitle2" sx={{ p: 1, color: 'text.secondary' }}>
                  {product.productDescription}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
                  ${product.price}
                </Typography>
                <Button onClick={() => handleAddToCart(product)} variant="contained" sx={{ width: '100%' }}>
                  Add to Cart
                </Button>
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>

      <MySnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        content="Product added to cart"
        bgcolor="#c4dfc5"
      />
    </Box>
  );
};

export default CategorySection;
