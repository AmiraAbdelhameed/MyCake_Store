// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../firebase';


// // Async thunk to fetch products from Firestore
// export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
//     const querySnapshot = await getDocs(collection(db, 'reviews'));
//     const data = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//         // createdAt: new Date().toISOString(),
//         createdAt:  docData.createdAt?.toDate().toISOString() || new Date().toISOString(),
//     }));
//     return data;
// });


// const reviewsSlice = createSlice({
//     name: 'reviews',
//     initialState: {
//         items: [],
//         status: 'idle',
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchReviews.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchReviews.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.items = action.payload;
//             })
//             .addCase(fetchReviews.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             });
//     },
// });

// export default reviewsSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// Async thunk to fetch reviews from Firestore
export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
    const querySnapshot = await getDocs(collection(db, 'reviews'));
    const data = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
            id: doc.id,
            ...docData,
            createdAt: docData.createdAt?.toDate().toISOString() || new Date().toISOString(),
        };
    });
    return data;
});

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default reviewsSlice.reducer;
