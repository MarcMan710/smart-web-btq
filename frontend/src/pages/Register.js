import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axiosConfig'; // Adjust the path as necessary
import Button from '../components/Button';

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
                    error = 'Format email invalid';
                }
                break;
            case 'password':
                if (value.length < 6) {
                    error = 'Password setidaknya 6 karakter';
                }
                break;
            case 'confirmPassword':
                if (value !== formData.password) {
                    error = 'Password tidak cocok';
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
            const response = await api.post('/api/auth/register', formData);
            if (response.status === 201) {
                // Redirect to Dashboard
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Registration failed:', error.response.data.message);
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-4xl font-bold text-nblack4 mb-4'>
                Daftar
            </h1>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <div className='flex items-center justify-between space-x-2 mb-2'>
                        <label>Nama depan:</label>
                        <input
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className='px-2 py-1 rounded-md w-[24ch]'
                        />
                    </div>
                    <div className='flex items-center justify-between space-x-2 mb-2'>
                        <label>Nama belakang:</label>
                        <input
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className='px-2 py-1 rounded-md w-[24ch]'
                        />
                    </div>
                    <div className='flex items-center justify-between space-x-2 mb-2'>
                        <label>Email:</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className='px-2 py-1 rounded-md w-[24ch]'
                        />
                    </div>
                    {
                        errors.email
                        && <span className='self-end text-sm text-nred mb-2'>
                            {errors.email}
                        </span>
                    }
                    <div className='flex items-center justify-between space-x-2 mb-2'>
                        <label>Password:</label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className='px-2 py-1 rounded-md w-[24ch]'
                        />
                    </div>
                    {
                        errors.password
                        && <span className='self-end text-sm text-nred mb-2'>
                            {errors.password}
                        </span>
                    }
                    <div className='flex items-center justify-between space-x-2 mb-2'>
                        <label>Konfirmasi password:</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className='px-2 py-1 rounded-md w-[24ch]'
                        />
                    </div>
                    {
                        errors.confirmPassword
                        && <span className='self-end text-sm text-nred mb-2'>
                            {errors.confirmPassword}
                        </span>
                    }

                    <div className="self-center mt-2">
                        <Button type='submit'>
                            Daftar
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;