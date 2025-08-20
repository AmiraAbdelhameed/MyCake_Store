// components/MySnackbar.js
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function MySnackbar({ open, onClose, content , bgcolor }) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            
        >
            <Alert onClose={onClose} sx={{ width: '100%' , bgcolor:`${bgcolor}` , color:'white' }}  variant='standard'>
                {content}
            </Alert>
        </Snackbar>
        // <Snackbar color="danger" variant="soft" />
    );
}
