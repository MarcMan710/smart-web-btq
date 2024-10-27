// frontend/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='flex flex-col items-center'>
            <header className='flex flex-col items-center max-w-[45ch] text-center'>
                <h1 className='text-4xl font-bold text-nblack4 mb-2'>Selamat datang di Smart Web BTQ</h1>
                <p className='text-sm text-nblack1 mb-4'>
                    Solusi lengkap untuk pembelajaran Al-Qur'an menggunakan teknologi Artificial Intelligent
                </p>
                <div className='font-bold text-nblue4 mb-6'>
                    <Link className='hover:text-nblue3' to="/register">Daftar</Link>
                    <span className='font-normal text-nblack4'> atau </span>
                    <Link className='hover:text-nblue3' to="/login">Masuk</Link>
                </div>
            </header>

            {/* Temporary app banner */}
            <section className='h-[12rem] w-full bg-gradient-to-r from-nblue1 to-nblue4' />
        </div>
    );
};

export default Home;