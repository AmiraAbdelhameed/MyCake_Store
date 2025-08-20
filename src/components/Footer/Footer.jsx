import React from 'react'
import { Box, Typography, Link, Stack } from '@mui/material';

const Footer = () => {
  return (
    <>
          <Box
              component="footer"
              sx={{
                  textAlign: 'center',
                  padding: '20px',
                  backgroundColor: 'primary.main',
                  color: 'white',
                  mt: 'auto',
              }}
          >
              <Typography variant="body2" color="white">
                  &copy; {new Date().getFullYear()} My Store. All rights reserved.
              </Typography>
              <Typography variant="body2" color="white" sx={{ mt: 1 }}>
                  Follow us on social media!
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 1 }}>
                  <Link href="#" color="inherit" underline="hover">
                      Facebook
                  </Link>
                  <Link href="#" color="inherit" underline="hover">
                      Twitter
                  </Link>
                  <Link href="#" color="inherit" underline="hover">
                      Instagram
                  </Link>
              </Stack>
          </Box>
    </>
  )
}

export default Footer
