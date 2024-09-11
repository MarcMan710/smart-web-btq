// frontend/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate  = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/auth/login', { email, password, rememberMe });
            localStorage.setItem('token', res.data.token);
            navigate.push('/dashboard');
        } catch (err) {
            console.error(err.response.data.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Remember Me
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Belum punya akun? <a href="/register">Register</a>
            </p>
        </div>
    );
};

export default Login;