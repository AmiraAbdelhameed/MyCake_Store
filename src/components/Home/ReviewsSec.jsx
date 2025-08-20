import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../Redux/reviewsSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ReviewsSec = () => {
    const dispatch = useDispatch();
    const { items: reviews, status, error } = useSelector((state) => state.reviews);
    useEffect(() => {
        if (status === 'idle') dispatch(fetchReviews());
    }, [dispatch, status]);

    return (
        <>
            <Typography variant="h4" textAlign="center" mt={4} mb={2}>
                Customers Reviews
            </Typography>
            {status === 'loading' && <Typography>Loading reviews...</Typography>}
            {status === 'failed' && <Typography color="error">{error}</Typography>}
            <Box sx={{  mx: 'auto', my: 4 }}>
                <Swiper
                    modules={[Navigation, Pagination, A11y, Autoplay]}
                    // spaceBetween={30}
                    slidesPerView={1}
                   navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    loop
                >
                    {reviews.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Box
                                sx={{
                                    minHeight: 150,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography variant="body1" sx={{ my: 2 }}>{item.review}</Typography>
                                <Typography variant="h6" sx={{ color:'primary.main' , fontSize:18 }}>{item.name}</Typography>
                              
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
         

        </>
    )
}

export default ReviewsSec
