import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const history = useHistory();

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
                history.push('/dashboard');
            }
        } catch (error) {
            console.error('Registration failed:', error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            {errors.email && <span>{errors.email}</span>}
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            {errors.password && <span>{errors.password}</span>}
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;