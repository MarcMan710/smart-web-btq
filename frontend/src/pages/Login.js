// frontend/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/auth/login', { email, password, rememberMe });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            console.error(err.response.data.message);
        }
    };

    return (
        <div className='flex flex-col items-center space-y-6 my-28 text-nblack4'>
            <h1 className='text-4xl font-bold'>
                Login
            </h1>
            <form onSubmit={handleSubmit}>
                {/* Flex container */}
                <div className='flex flex-col space-y-4 w-[340px]'>
                    <div className='flex items-center justify-between space-x-2'>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='px-2 py-1 rounded-md'
                        />
                    </div>
                    <div className='flex items-center justify-between space-x-2'>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='px-2 py-1 rounded-md'
                        />
                    </div>
                    {/* Reformatted for easier styling */}
                    {/* <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            Remember Me
                        </label>
                    </div> */}
                    <div className='flex items-center justify-center space-x-2'>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            id="rememberMeCheckbox"
                            className='px-2 py-1 rounded-md'
                        />
                        <label htmlFor="rememberMeCheckbox">Remember Me</label>
                    </div>
                    <button className='w-full font-bold text-nwhite1 bg-nblue4 py-2 rounded-full hover:bg-nblue1' type="submit">Login</button>
                </div>
            </form>
            <p>
                Belum punya akun? <a className='font-bold text-nblue4 hover:text-nblue3' href="/register">Register</a>
            </p>
        </div>
    );
};

export default Login;