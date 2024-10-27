import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import Button from '../components/Button';

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
                        <label htmlFor='loginEmail'>Email:</label>
                        <input
                            id='loginEmail'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='px-2 py-1 rounded-md w-[24ch]'
                        />
                    </div>
                    <div className='flex items-center justify-between space-x-2 mb-2'>
                        <label htmlFor='loginPassword'>Password:</label>
                        <input
                            id='loginPassword'
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

                    <div className='self-center mb-4'>
                        <Button type='submit'>
                            Masuk
                        </Button>
                    </div>
                </div>
            </form>
            <p>
                Belum punya akun? <a className='font-bold text-nblue4 hover:text-nblue3' href="/register">Daftar</a>
            </p>
        </div>
    );
};

export default Login;