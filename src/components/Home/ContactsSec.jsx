import { Box, Typography } from '@mui/material'
import React from 'react'

const ContactsSec = () => {
    return (
        <>
            <Box sx={{ position: 'relative', width: '100%', height: '50vh', overflow: 'hidden' }}>

                <Box component={'img'} src='./images/header7.avif' alt='Contact Us'
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', mb: 4 }} >
                </Box>
                <Box sx={{
                    position: 'absolute', top: '30%', right: { md: '10%' }, textAlign: 'center', width: {
                        xs: '90%',
                        sm: '60%',
                        md: '40%',
                    }
                }}>
                    <Box sx={{ backgroundColor: 'primary.main', color: 'white', padding: 2 }}>
                        <Typography>Contact Us</Typography>
                        <Box component={'table'} sx={{ width: '100%', mt: 2 , textAlign: 'left'}}>
                            <Box component={'tbody'}>
                            <Box component={'tr'}>
                                <Box component={'td'} sx={{ padding: 1, width: '30%' }}>
                                    <Typography variant="body1">Email:</Typography>
                                </Box>
                                <Box component={'td'} sx={{ padding: 1 }}>
                                    <Typography variant="body1">mycake@gmail.com</Typography>
                                </Box>
                            </Box>
                            <Box component={'tr'}>
                                <Box component={'td'} sx={{ padding: 1, width: '30%' }}>
                                    <Typography variant="body1">Phone:</Typography>
                                </Box>
                                <Box component={'td'} sx={{ padding: 1 }}>
                                    <Typography variant="body1">+1234567890</Typography>
                                </Box>
                            </Box>
                            <Box component={'tr'}>
                                <Box component={'td'} sx={{ padding: 1, width: '30%' }}>
                                    <Typography variant="body1">Address:</Typography>
                                </Box>
                                <Box component={'td'} sx={{ padding: 1 }}>
                                    <Typography variant="body1">123 Cake Street, Sweet City</Typography>
                                </Box>
                            </Box>
                        </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ContactsSec
