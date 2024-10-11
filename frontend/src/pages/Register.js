import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        validateInput(e.target.name, e.target.value);
    };

    const validateInput = (name, value) => {
        let error = '';
        switch (name) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    error = 'Invalid email format';
                }
                break;
            case 'password':
                if (value.length < 6) {
                    error = 'Password must be at least 6 characters';
                }
                break;
            case 'confirmPassword':
                if (value !== formData.password) {
                    error = 'Passwords do not match';
                }
                break;
            default:
                break;
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(errors).some(error => error)) {
            console.error('Form contains errors');
            return;
        }
        try {
            const response = await axios.post('/api/auth/register', formData);
            if (response.status === 201) {
                // Redirect to Dashboard
                navigate.push('/dashboard');
            }
        } catch (error) {
            console.error('Registration failed:', error.response.data.message);
        }
    };

    return (
        <div className='flex flex-col items-center space-y-6 my-14'>
            <h1 className='text-4xl font-bold text-nblack4'>
                Register
            </h1>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col items-center space-y-6 w-[340px]'>
                    <input className='w-full px-2 py-1 rounded-md text-nblack4' type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
                    <input className='w-full px-2 py-1 rounded-md text-nblack4' type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
                    <input className='w-full px-2 py-1 rounded-md text-nblack4' type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    {errors.email && <span className='text-sm text-nred'>{errors.email}</span>}
                    <input className='w-full px-2 py-1 rounded-md text-nblack4' type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                    {errors.password && <span className='text-sm text-nred'>{errors.password}</span>}
                    <input className='w-full px-2 py-1 rounded-md text-nblack4' type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
                    {errors.confirmPassword && <span className='text-sm text-nred'>{errors.confirmPassword}</span>}
                    <button className='w-full font-bold text-nwhite1 bg-nblue4 py-2 rounded-full hover:bg-nblue1' type="submit">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;