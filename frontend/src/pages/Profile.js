import React, { useState, useEffect, useContext } from 'react';
import api from '../axiosConfig';
import AuthContext from '../context/AuthContext';

const Profile = () => {
    const { authState } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        level: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await api.get('/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${authState.token}`
                    }
                });
                console.log(res.data);
                setUserData(res.data);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchUserData();
    }, [authState.token]);

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
            await api.put('/api/users', userData, {
                headers: {
                    Authorization: `Bearer ${authState.token}`
                }
            });
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