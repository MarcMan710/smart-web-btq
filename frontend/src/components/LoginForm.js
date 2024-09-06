// frontend/src/components/LoginForm.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const { login } = useAuth();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            login(data.token, rememberMe, data.role);
            if (data.role === 'User') {
                history.push('/user-dashboard');
            } else if (data.role === 'Instructor') {
                history.push('/instructor-dashboard');
            }
        } else {
            console.error(data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username or Email</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password</label>
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
            <div>
                <p>Don't have an account? <a href="/register">Register here</a></p>
                <p><a href="/forgot-password">Forgot Password?</a></p>
            </div>
        </form>
    );
};

export default LoginForm;