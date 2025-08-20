import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export const addProductToCart = createAsyncThunk(
    'cart/addProductToFirebaseCart',
    async (product, thunkAPI) => {
        try {
            if (!product.id) {
                throw new Error('Product id is required for cart operations.');
            }
            if (!product.userId) {
                throw new Error('User id is required for cart operations.');
            }
            const cartRef = collection(db, 'cart');

            const q = query(cartRef, where('id', '==', product.id), where('userId', '==', product.userId));
            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
     
                const existingDoc = snapshot.docs[0];
                const existingData = existingDoc.data();
                const newQuantity = (existingData.quantity || 1) + (product.quantity || 1);

                await updateDoc(doc(db, 'cart', existingDoc.id), {
                    quantity: newQuantity
                });

                return {
                    ...existingData,
                    firebaseId: existingDoc.id,
                    quantity: newQuantity,
                };
            } else {
         
                const docRef = await addDoc(cartRef, {
                    ...product,
                    quantity: product.quantity ?? 1,
                    addedAt: new Date().toISOString(),
                    userId: product.userId,
                });

                return { ...product, firebaseId: docRef.id };
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async (_, thunkAPI) => {
        try {
            const cartRef = collection(db, 'cart');
            const snapshot = await getDocs(cartRef);
            const items = snapshot.docs.map(doc => ({ firebaseId: doc.id, ...doc.data() }));
            return items;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(p => p.id === id);
            if (item) item.quantity = quantity;
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProductToCart.fulfilled, (state, action) => {
                const product = action.payload;
                const existing = state.items.find(item => item.id === product.id);
                if (existing) {
                    existing.quantity = product.quantity;
                } else {
                    state.items.push({ ...product });
                }
                state.status = 'succeeded';
            })
            .addCase(addProductToCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchCartItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
