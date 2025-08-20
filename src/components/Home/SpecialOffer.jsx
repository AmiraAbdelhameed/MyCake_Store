import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router';

const SpecialOffer = () => {
    const navigate = useNavigate();

    return (
        <>
            <Typography variant="h4" textAlign="center" mt={4} mb={2}>
                Special Birthday Offer
            </Typography>
            <Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: {
                        xs: 'column',
                        sm: 'row',
                    },
                    gap: '20px',
                    height: '60vh',
                    margin: '20px 0',
                    padding: '20px',
                }}>

                    <Box sx={{
                        backgroundColor: 'primary.main',
                        padding: '20px',
                     
                        margin: '20px 0',
                        width: {
                            xs: '100%',
                            sm: '50%',
                            md: '30%',
                        },
                        height: '100%',
                        display: 'flex'
                        , justifyContent: 'center', 
                        alignItems: 'center',
                        flexDirection: 'column',
                        lineHeight: 3,
                        textAlign: 'center',
                        gap: '10px',
                    }}>
                        <Typography variant="body1" sx={{ 
                            marginTop: '10px', color: 'white', 
                            }}>
                            Enjoy 20% off your entire purchase on your birthday as our special gift to you.
                        </Typography>
                        <Button variant="outline"  sx={{
                            marginTop: '20px',
                            backgroundColor: 'secondary.main',
                            color: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'secondary.dark',
                            },
                            
                        }}
                        onClick={() => navigate('/products')}
                        >Order Now</Button>
                    </Box>
                    <Box component={'img'} sx={{
                        width: {
                            xs: '100%',
                            sm: '50%',
                            md: '70%',
                        },
                        height: '100%',
                        objectFit: 'cover',

                    }}
                        src=".\images\bday.webp"   >

                    </Box>
                </Box>
              

            </Box>
        </>
    )
}

export default SpecialOffer
