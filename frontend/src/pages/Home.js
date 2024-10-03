// frontend/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'; // Tambahkan impor untuk Footer

const Home = () => {
    return (
        <div className='flex flex-col space-y-12 items-center'>
            {/* hero */}
            <header className='flex flex-col items-center my-20'>
                <h1 className='text-4xl font-bold text-nblack4'>Welcome to Smart Web BTQ</h1>
                <p className='text-sm text-nblack1 mb-4'>Your one-stop solution for personalized learning and progression tracking.</p>
                <div className='font-bold text-nblue4'>
                    <Link className='hover:text-nblue3' to="/register">Get Started</Link>
                    <span className='font-normal text-nblack4'> or </span>
                    <Link className='hover:text-nblue3' to="/login">Login</Link>
                </div>
            </header>

            {/* Temporary app banner */}
            <section className='h-[240px] w-full bg-gradient-to-r from-nblue1 to-nblue4'>
                {/* <img src="path/to/your/banner/image.jpg" alt="App Banner" style={{ width: '100%', height: 'auto' }} /> */}
            </section>
            {/* <Footer /> */}{/* Tambahkan Footer di sini */}
        </div>
    );
};

export default Home;