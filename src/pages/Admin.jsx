
import Sidebar from '../components/Admin/Sidebar';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const Admin = () => {
  return (
    <>
    {/* <Box sx={{ display: 'flex', height: '100vh' }}> */}
    <Navbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
  
        <Outlet />
      </Box>
    {/* </Box> */}
    </>
  );
};

export default Admin;
