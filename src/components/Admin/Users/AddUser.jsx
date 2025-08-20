import React, { useState } from 'react';
import { db, firebaseConfig } from '../../../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const AddUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'customer',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const { name, email, password, role } = formData;

        try {
            // 🔑 Create a secondary Firebase app to avoid logging out the admin
            const secondaryApp = initializeApp(firebaseConfig, "Secondary");

            const secondaryAuth = getAuth(secondaryApp);

            const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
            const user = userCredential.user;

            // Save user info to Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name,
                email,
                role,
                createdAt: new Date(),
            });

            alert("User added successfully!");
            setFormData({
                name: '',
                email: '',
                password: '',
                role: 'customer',
            });

            // 🔥 Optionally delete the secondary app after use
            await secondaryApp.delete();

        } catch (err) {
            console.error("Add user error:", err);
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
            </select>
            <button type="submit">Add User</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default AddUser;
