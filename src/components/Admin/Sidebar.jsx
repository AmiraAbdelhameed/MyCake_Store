import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  return (
    // <Drawer
    //   variant="permanent"
    //   sx={{
    //     width: drawerWidth,
    //     flexShrink: 0,
    //     [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    //   }}
    // >
    <Box>

      <Toolbar />
      <List>
        {[
          { text: 'Dashboard', path: '/admin/dashboard' },
          { text: 'Products', path: '/admin/products' },
          { text: 'Users', path: '/admin/users' },
          { text: 'Orders', path: '/admin/orders' },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
            </Box>
    // </Drawer>
  );
};

export default Sidebar;
