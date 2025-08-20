import React, { useEffect, useState } from 'react'
import useAuth from '../../Hooks/useAuth';
import { Typography } from '@mui/material';

const PersonalInfo = () => {
    const currentUser = useAuth();
    const [name, setName] = useState('Guest');

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.displayName || currentUser.email);
        }
    }, [currentUser]);

    return (
        <>
          
            <Typography variant="h6" sx={{ mb: 2, fontWeight:'bold ' }}>
             Welcome, {name} !
            </Typography>
        </>
    )
}

export default PersonalInfo
