// // import React, { useState } from 'react';
// // import { auth, db } from '../../firebase';
// // import {
// //     signInWithEmailAndPassword,
// //     GoogleAuthProvider,
// //     signInWithPopup
// // } from 'firebase/auth';
// // import {
// //     doc,
// //     getDoc,
// //     setDoc
// // } from 'firebase/firestore';
// // import { Navigate } from 'react-router';
// // import { useNavigate } from "react-router";
// // const LoginForm = () => {
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [error, setError] = useState(null);
// //     let navigate = useNavigate();
// //     const handleLogin = async (e) => {
// //         e.preventDefault();
// //         setError(null);

// //         try {
// //             const userCredential = await signInWithEmailAndPassword(auth, email, password);
// //             const user = userCredential.user;

// //             await checkUserRole(user.uid);
// //         } catch (err) {
// //             console.error("Login error:", err);
// //             setError(err.message);
// //         }
// //     };

// //     const signInWithGoogle = async () => {
// //         const provider = new GoogleAuthProvider();

// //         try {
// //             const result = await signInWithPopup(auth, provider);
// //             const user = result.user;

// //             const userDocRef = doc(db, 'users', user.uid);
// //             const userSnap = await getDoc(userDocRef);

// //             // Save new Google user to Firestore if not exists
// //             if (!userSnap.exists()) {
// //                 await setDoc(userDocRef, {
// //                     uid: user.uid,
// //                     name: user.displayName || '',
// //                     email: user.email,
// //                     role: 'customer', // Default role
// //                     createdAt: new Date()
// //                 });

// //                 console.log("✅ Google user saved to Firestore");
// //             } else {
// //                 console.log("ℹ️ Google user already exists in Firestore");
// //             }

// //             // Role check and redirect
// //             await checkUserRole(user.uid);

// //         } catch (err) {
// //             console.error("Google Sign-in error:", err);
// //             setError(err.message);
// //         }
// //     };

// //     const checkUserRole = async (uid) => {
// //         const userDocRef = doc(db, 'users', uid);
// //         const userSnap = await getDoc(userDocRef);

// //         if (!userSnap.exists()) {
// //             setError("User not found in Firestore.");
// //             return;
// //         }

// //         const userData = userSnap.data();

// //         if (userData.role === "admin") {
// //             alert("Welcome Admin!");
// //             navigate('/admin')
// //         } else if (userData.role === "customer") {
// //             alert("Welcome Customer!!!!");
// //             navigate('/')
// //         } else {
// //             setError("Unauthorized role.");
// //         }
// //     };

// //     return (
// //         <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
// //             <input
// //                 type="email"
// //                 placeholder="Email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 required
// //             />
// //             <input
// //                 type="password"
// //                 placeholder="Password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //             />
// //             <button type="submit">Login</button>

// //             <hr />
// //             <button type="button" onClick={signInWithGoogle}>Sign in with Google</button>

// //             {error && <p style={{ color: 'red' }}>{error}</p>}
// //         </form>
// //     );
// // };

// // export default LoginForm;
// // src/pages/LoginPage.jsx
// import React, { useState } from 'react';
// import {
//     Box,
//     Button,
//     Grid,
//     Paper,
//     TextField,
//     Typography,
//     Divider
// } from '@mui/material';
// import GoogleIcon from '@mui/icons-material/Google';
// import { useNavigate } from 'react-router-dom';
// import {
//     signInWithEmailAndPassword,
//     GoogleAuthProvider,
//     signInWithPopup
// } from 'firebase/auth';
// import { auth, db } from '../../firebase';
// import { doc, getDoc, setDoc } from 'firebase/firestore';

// const LoginForm = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError(null);

//         try {
//             const userCredential = await signInWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;
//             await checkUserRole(user.uid);
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const signInWithGoogle = async () => {
//         const provider = new GoogleAuthProvider();

//         try {
//             const result = await signInWithPopup(auth, provider);
//             const user = result.user;

//             const userDocRef = doc(db, 'users', user.uid);
//             const userSnap = await getDoc(userDocRef);

//             if (!userSnap.exists()) {
//                 await setDoc(userDocRef, {
//                     uid: user.uid,
//                     name: user.displayName || '',
//                     email: user.email,
//                     role: 'customer',
//                     createdAt: new Date()
//                 });
//             }

//             await checkUserRole(user.uid);
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const checkUserRole = async (uid) => {
//         const userSnap = await getDoc(doc(db, 'users', uid));
//         const userData = userSnap.data();

//         if (userData.role === 'admin') {
//             navigate('/admin');
//         } else if (userData.role === 'customer') {
//             navigate('/');
//         } else {
//             setError('Unauthorized role.');
//         }
//     };

//     return (
//         <Grid container sx={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', gap: 4, bgcolor: '#f5f5f5' }}>
//             <Box sx={{
//                 bgcolor: 'white', borderRadius: 2, boxShadow: 3,
//                 p: 4
//             }}>


//                 <Box
//                     component={'img'}
//                     src='images/header7.avif'
//                     sx={{
//                         height: '100%',
//                         display: { xs: 'none', lg: 'block' },

//                     }}
//                 ></Box>
//                 <Box sx={{ p: 4, width: '100%', maxWidth: 400 }}>
//                     <Typography variant="h5" gutterBottom textAlign="center">
//                         Login to Your Account
//                     </Typography>

//                     <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                         <TextField
//                             label="Email"
//                             fullWidth
//                             required
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />

//                         <TextField
//                             label="Password"
//                             type="password"
//                             fullWidth
//                             required
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />

//                         <Button type="submit" variant="contained" color="primary" fullWidth>
//                             Login
//                         </Button>

//                         <Divider sx={{ my: 2 }}>OR</Divider>

//                         <Button
//                             variant="outlined"
//                             fullWidth
//                             onClick={signInWithGoogle}
//                             startIcon={<GoogleIcon />}
//                         >
//                             Sign in with Google
//                         </Button>

//                         {error && (
//                             <Typography color="error" variant="body2" mt={1} textAlign="center">
//                                 {error}
//                             </Typography>
//                         )}
//                     </Box>
//                 </Box>
//             </Box>
//         </Grid>
//     );
// };

// export default LoginForm;

import {
    Grid,
    Box,
    Typography,
    TextField,
    Button,
    Divider,
    Paper
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import {
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

import { Navigate, NavLink, useNavigate } from "react-router";
const LoginForm = () => {

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState(null);
        let navigate = useNavigate();
        const handleLogin = async (e) => {
            e.preventDefault();
            setError(null);

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                await checkUserRole(user.uid);
            } catch (err) {
                console.error("Login error:", err);
                setError(err.message);
            }
        };

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

        const checkUserRole = async (uid) => {
            const userDocRef = doc(db, 'users', uid);
            const userSnap = await getDoc(userDocRef);

            if (!userSnap.exists()) {
                setError("User not found in Firestore.");
                return;
            }

            const userData = userSnap.data();

            if (userData.role === "admin") {
                alert("Welcome Admin!");
                navigate('/admin')
            } else if (userData.role === "customer") {
                alert("Welcome Customer!!!!");
                navigate('/')
            } else {
                setError("Unauthorized role.");
            }
        };
    return (
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

                {/* Form Section */}
                <Box
                    sx={{
                        flex: 1,
                        p: { xs: 4, sm: 6 },
                        background: 'linear-gradient(135deg, #ffffff, #f0f4ff)',
                    }}
                >
                    <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3}>
                        Welcome Back
                    </Typography>
                    <Typography variant="subtitle1" textAlign="center" color="text.secondary" mb={4}>
                        Please sign in to continue
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleLogin}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
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
                            Login
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
                        <Typography sx={{textAlign:'center'}}>Do not have account? <Typography component={NavLink} to={'/signup'}>Sign up</Typography></Typography>
                        

                        {error && (
                            <Typography color="error" variant="body2" textAlign="center" mt={1}>
                                {error}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Grid>
    );
};

export default LoginForm;
