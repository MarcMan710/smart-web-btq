// frontend/src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        level: '',
        role: '',
        username: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get('/api/users/me');
                setUserData(res.data);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/api/users/me', userData);
            alert('Profile updated successfully');
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <h1>Profile Page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} />
                </label>
                <label>
                    Level:
                    <input type="text" name="level" value={userData.level} readOnly />
                </label>
                <label>
                    Role:
                    <input type="text" name="role" value={userData.role} readOnly />
                </label>
                <label>
                    Username:
                    <input type="text" name="username" value={userData.username} readOnly />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={userData.email} readOnly />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={userData.password} readOnly />
                </label>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;