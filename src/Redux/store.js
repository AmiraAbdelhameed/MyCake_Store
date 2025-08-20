import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import reviewsReducer from './reviewsSlice';
export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        reviews: reviewsReducer,
    },
});