
import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider,
    signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Box, Button, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { NavLink, useNavigate } from 'react-router';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userDocRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userDocRef);

            if (!userSnap.exists()) {
                await setDoc(userDocRef, {
                    uid: user.uid,
                    name: user.displayName || '',
                    email: user.email,
                    role: 'customer',
                    createdAt: new Date()
                });

                console.log("✅ Google user saved to Firestore");
            } else {
                console.log("ℹ️ Google user already exists in Firestore");
            }

            await checkUserRole(user.uid);

        } catch (err) {
            console.error("Google Sign-in error:", err);
            setError(err.message);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1. Create user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Update display name
            await updateProfile(user, { displayName: name });

            // 3. Save user data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: name,
                email: user.email,
                role: "customer",
                createdAt: new Date()
            });

            alert("Signup successful!");
            navigate('/login'); // Redirect to login page after signup
            console.log("User data saved to Firestore.");
        } catch (err) {
            setError(err.message);
            console.error("Signup error:", err);
        }
    };

    return (
        <>

        <Grid
                    container
                    sx={{
                        minHeight: '100vh',
                        bgcolor: '#f5f5f5',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: { xs: 2, md: 4 },
                    }}
                >
                    <Paper
                        elevation={6}
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            borderRadius: 4,
                            overflow: 'hidden',
                            maxWidth: 1000,
                            width: '100%',
                        }}
                    >
                    <Box
                        sx={{
                            flex: 1,
                            p: { xs: 4, sm: 6 },
                            background: 'linear-gradient(135deg, #ffffff, #f0f4ff)',
                        }}
                    >
                        <Box component={NavLink} to={'/login'} sx={{color:'primary.main' , textDecoration:'none' , display: 'flex', alignItems: 'center', mb: 3}}>
                            <ArrowBackIosIcon sx={{ fontSize: 20, }} />
                            <Typography>
                        Login
                            </Typography>
                        </Box>
                        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3}>
                            Welcome 
                        </Typography>
                    

                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                        >
                            <TextField
                                label="Name"
                                type="name"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                variant="outlined"
                            />
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="outlined"
                            />

                            <Button type="submit" variant="contained" size="large" fullWidth>
                                Sign up
                            </Button>

                            <Divider sx={{ my: 2 }}>OR</Divider>
                            <Button
                                variant="outlined"
                                size="large"
                                fullWidth
                                startIcon={<GoogleIcon />}
                                onClick={signInWithGoogle}
                            >
                                Sign in with Google
                            </Button>
                            {error && (
                                <Typography color="error" variant="body2" textAlign="center" mt={1}>
                                    {error}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                        {/* Image Section */}
                        <Box
                            component="img"
                            src="images/header7.avif"
                            alt="Login Visual"
                            sx={{
                                display: { xs: 'none', md: 'block' },
                                width: '50%',
                                objectFit: 'cover',
                            }}
                        />
        
                     
                       
                    </Paper>
                </Grid>
        </>
    );
};

export default SignupForm;
