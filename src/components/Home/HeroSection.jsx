import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper/modules';
import { Global } from '@emotion/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import { Box, Button, Typography } from '@mui/material';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router';
const HeroSection = () => {
    const navigate = useNavigate();
    const currentUser = useAuth();
    const images = [
        './images/header1.avif',
        './images/header2.avif',
        './images/header3.avif',
        './images/header4.avif',
        './images/header5.avif',
        './images/header6.avif',
        './images/header7.avif',
        './images/header8.avif',
    ]

    return (
        <>
            <Global
                styles={{
                    '.swiper-pagination-bullet': {
                        backgroundColor: '#ccc',
                        opacity: 1,
                    },
                    '.swiper-pagination-bullet-active': {
                        backgroundColor: '#A0231F',
                    },
                    '.swiper-button-next, .swiper-button-prev': {
                        color: '#A0231F',
                    },
                }}
            />
            <Box
                sx={{
                    width: '100%',
                    height: {
                        xs: '50vh',
                        md: '100vh',
                    },
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, A11y]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    pagination={{ clickable: true }}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <Box
                                component="img"
                                src={image}
                                alt={`Slide ${index + 1}`}
                                sx={{
                                    width: '100%',
                                    height: '100vh',
                                    objectFit: 'cover',
                                }}
                            />

                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 2,
                                    color: 'white',
                                    textAlign: 'center',
                                    background: 'rgba(0, 0, 0, 0.5)',
                                }}
                            >
                                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                                    Delious Cakes to order
                                </Typography>
                                <Button variant='contained' onClick={() => navigate('/products')}>Choose a cake</Button>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </>
    )
}

export default HeroSection
