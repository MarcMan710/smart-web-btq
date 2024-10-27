import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/auth/login', { email, password });
            login(res.data.token, rememberMe);
            navigate('/dashboard');
        } catch (err) {
            console.error(err.response.data.message);
        }
    };

    return (
        <div className='flex flex-col items-center text-nblack4'>
            <h1 className='text-4xl font-bold mb-4'>
                Masuk
            </h1>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <div className='flex items-center justify-between space-x-2 mb-2'>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='px-2 py-1 rounded-md w-[24ch]'
                        />
                    </div>
                    <div className='flex items-center justify-between space-x-2 mb-2'>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='px-2 py-1 rounded-md w-[24ch]'
                        />
                    </div>
                    <div className='flex items-center justify-center space-x-2 mb-2'>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            id="rememberMeCheckbox"
                            className='px-2 py-1 rounded-md'
                        />
                        <label htmlFor="rememberMeCheckbox">Ingat saya</label>
                    </div>

                    <button
                        className='mb-4 self-center w-[16ch] font-bold text-nwhite1 bg-nblue4 py-2 rounded-lg hover:bg-nblue3'
                        type="submit"
                    >
                        Masuk
                    </button>
                </div>
            </form>
            <p>
                Belum punya akun? <a className='font-bold text-nblue4 hover:text-nblue3' href="/register">Daftar</a>
            </p>
        </div>
    );
};

export default Login;