import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import AddUser from './AddUser';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        userName: '',
        userEmail: '',
        role: '',
    });

    const fetchUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const usersData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(usersData);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, 'users', id));
            alert("User deleted!");
            fetchUsers();
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    const startEditing = (user) => {
        setEditingUserId(user.id);
        setEditFormData({
            userName: user.name || '',
            userEmail: user.email || '',
            role: user.role || '',
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (id) => {
        try {
            await updateDoc(doc(db, 'users', id), {
                name: editFormData.userName,
                email: editFormData.userEmail,
                role: editFormData.role
            });
            alert("User updated!");
            setEditingUserId(null);
            fetchUsers();
        } catch (err) {
            console.error("Error updating user:", err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <h1>Users</h1>
            {users.map((user) => (
                <div key={user.id} style={{ border: "1px solid gray", marginBottom: "10px", padding: "10px" }}>
                    {editingUserId === user.id ? (
                        <>
                            <input
                                type="text"
                                name="userName"
                                value={editFormData.userName}
                                onChange={handleEditChange}
                            />
                            <input
                                type="text"
                                name="userEmail"
                                value={editFormData.userEmail}
                                onChange={handleEditChange}
                            />
                            <input
                                type="text"
                                name="role"
                                value={editFormData.role}
                                onChange={handleEditChange}
                            />
                            <button onClick={() => handleUpdate(user.id)}>Save</button>
                            <button onClick={() => setEditingUserId(null)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <div><strong>Name:</strong> {user.name}</div>
                            <div><strong>Email:</strong> {user.email}</div>
                            <div><strong>Role:</strong> {user.role}</div>
                            <button onClick={() => startEditing(user)}>Edit</button>
                            <button onClick={() => handleDelete(user.id)} style={{ color: 'red' }}>Delete</button>
                        </>
                    )}
                </div>
            ))}
            <AddUser />
        </>
    );
};

export default Users;
