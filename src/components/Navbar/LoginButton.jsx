import React from 'react'
import useAuth from '../../Hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { NavLink, useNavigate } from 'react-router';
import Button from '@mui/material/Button';
const LoginButton = () => {
    const navigate = useNavigate();
    const currentUser = useAuth();
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out.");
                alert("You have been logged out.");
            })
            .catch((error) => {
                console.error("Sign out error:", error);
            });
    };

  return (
    <>
           {currentUser ? (
              <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginLeft: 'auto', color: '#fff' }}
                  onClick={handleLogout}
              >
                  {/* <button onClick={handleLogout} style={{ marginTop: '10px' }}> */}
                  Log Out
              {/* </button> */}
              </Button>
          ):
    
         <Button
         variant="contained"
         color="primary"
         component={NavLink}
         to="/login"
         sx={{ marginLeft: 'auto', color: '#fff' }}
     >
            Log In
     </Button>
          }
    </>
  )
}

export default LoginButton
