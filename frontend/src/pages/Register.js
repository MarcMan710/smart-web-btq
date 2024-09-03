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
    const history = useHistory();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;