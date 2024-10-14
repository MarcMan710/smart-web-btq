import React, { useState, useEffect } from 'react';
import api from '../axiosConfig'; // Import the configured Axios instance

const Profile = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        level: '',
        role: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await api.get('/api/users/me'); // Use the configured Axios instance
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
            await api.put('/api/users/me', userData); // Use the configured Axios instance
            alert('Profile updated successfully');
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className='flex flex-col items-center text-nblack4 space-y-6 mt-6 mb-32'>
            <h1 className='font-bold text-4xl'>Profile Page</h1>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col space-y-4 w-[340px]'>
                    <div className='flex justify-between space-x-1'>
                        <label htmlFor='firstName'>First Name:</label>
                        <input className='px-2 py-1 rounded-md' type="text" name="firstName" id='firstName' value={userData.firstName} onChange={handleChange} />
                    </div>
                    <div className='flex justify-between space-x-1'>
                        <label htmlFor='lastName'>Last Name:</label>
                        <input className='px-2 py-1 rounded-md' type="text" name="lastName" id='lastName' value={userData.lastName} onChange={handleChange} />
                    </div>
                    <div className='flex justify-between space-x-1'>
                        <label htmlFor='level'>Level:</label>
                        <input className='px-2 py-1 rounded-md' type="text" name="level" id='level' value={userData.level} readOnly />
                    </div>
                    <div className='flex justify-between space-x-1'>
                        <label htmlFor='role'>Role:</label>
                        <input className='px-2 py-1 rounded-md' type="text" name="role" id='role' value={userData.role} readOnly />
                    </div>
        
                    <div className='flex justify-between space-x-1'>
                        <label htmlFor='email'>Email:</label>
                        <input className='px-2 py-1 rounded-md' type="email" name="email" id='email' value={userData.email} readOnly />
                    </div>
                    <div className='flex justify-between space-x-1'>
                        <label htmlFor='password'>Password:</label>
                        <input className='px-2 py-1 rounded-md' type="password" name="password" id='password' value={userData.password} readOnly />
                    </div>
                </div>
                <button className='w-[340px] mt-8 font-bold text-nwhite1 bg-nblue4 py-2 rounded-full hover:bg-nblue1' type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;