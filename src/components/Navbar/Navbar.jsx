import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { NavLink, useNavigate, useNavigation } from 'react-router-dom';
import LoginButton from './LoginButton';
import PersonIcon from '@mui/icons-material/Person';
import useAuth from '../../Hooks/useAuth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const drawerWidth = 240;
const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
];

const Navbar = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const currentUser = useAuth();
    const navigate = useNavigate()
    const db = getFirestore()


    const handleProfile = async () => {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userDocRef);


        if (!userSnap.exists()) {
            setError("User not found in Firestore.");
            return;
        }

        const userData = userSnap.data();

        if (userData.role === "admin") {
            navigate('/admin')
        } else if (userData.role === "customer") {
            navigate('/profile')
        } else {

            setError("Unauthorized role.");
        }
    };

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Mycake
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton component={NavLink} to={item.path} sx={{ textAlign: 'left' }}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Container sx={{ }}>
                <Box  sx={{ mx: 'auto', mt: 8, display: 'flex' }}>
                    <CssBaseline />
                    <AppBar component="nav">
                        <Toolbar sx={{ backgroundColor: "secondary.main", justifyContent: 'space-between' }}>
                            {/* Icon appear in small screens */}
                            <IconButton
                                color="text.primary"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { sm: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>
                            {/* Logo */}
                            <Typography
                                variant="h6"
                                component={NavLink} to={"/"}

                                sx={{ display: { xs: 'none', sm: 'block' }, color: 'primary.main' , textDecoration:'none' }}
                            >
                                Mycake
                            </Typography>
                            {/* Menu links  */}
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                {navItems.map((item) => (
                                    <Button key={item.label} component={NavLink} to={item.path} sx={{ color: 'text.primary' }}>
                                        {item.label}
                                    </Button>
                                ))}
                            </Box>
                            {/* Login button */}
                            <Box>
                                <IconButton onClick={()=>navigate('/cart')}><ShoppingCartIcon sx={{ color: 'text.primary' }} /></IconButton>   
                                <IconButton sx={{ color: 'text.primary' }} onClick={handleProfile}><PersonIcon /></IconButton>
                                <LoginButton />
                            </Box>
                        </Toolbar>
                    </AppBar>
                    {/* Drawer appear in small screens */}
                    <nav>
                        <Drawer
                            container={container}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true,
                            }}
                            sx={{
                                display: { xs: 'block', sm: 'none' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </nav>

                </Box>
            </Container>

        </>
    )
}
export default Navbar

