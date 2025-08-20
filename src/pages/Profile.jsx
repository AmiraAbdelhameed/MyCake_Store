// import React, { useEffect, useState } from 'react'
// import useAuth from '../Hooks/useAuth';
// import { Box } from '@mui/material';

// const Profile = () => {
//     const currentUser = useAuth();
//     const [name, setName] = useState('Guest');
//     useEffect(() => {
//         const handleProfile = async () => {
//             await setName(currentUser.displayName);
//         }
//         handleProfile();
//     }, [currentUser])
//     return (
//         <>
//             <Box sx={{
//                 minHeight: '80vh',
//             }}>
               
//                 <h1>{name}</h1>
//                 {currentUser ? (
//                     <div style={{ marginTop: '20px' }}>
//                         <p>Welcome, {currentUser.displayName || currentUser.email}!</p>
//                     </div>
//                 ) :
//                     (
//                         <div style={{ marginTop: '20px' }}>
//                             <p>Welcome, Guest!</p>
//                         </div>
//                     )
//                 }

//             </Box>
//         </>
//     )
// }

// export default Profile
import React, { useEffect, useState } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Toolbar,
    AppBar,
    CssBaseline
} from '@mui/material';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const drawerWidth = 240;

const Profile = () => {
   
    const location = useLocation();

    const navItems = [
        { label: 'Personal Info', path: '/profile' },
        { label: 'My Orders', path: '/profile/orders' },
        { label: 'Reviews & Complaints', path: '/profile/reviews' },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Sidebar */}
            <Box
            sx={{
                bgcolor: 'white',
                p:2
            }}
            >
                <Toolbar />
                {/* <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                    {name}
                </Typography> */}
                <List>
                    {navItems.map((item) => (
                        <ListItem key={item.path} disablePadding>
                            <ListItemButton
                                component={NavLink}
                                to={item.path}
                                selected={location.pathname === item.path}
                                sx={{
                                    borderRadius: 1,
                                    '&.Mui-selected': {
                                        backgroundColor: '#e0e0e0',
                                        fontWeight: 'bold',
                                    },
                                    color: 'primary.main',
                                }}
                            >
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 2,
                    minHeight: '100vh',
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default Profile;
