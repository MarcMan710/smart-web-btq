// frontend/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <header>
                <h1>Welcome to Smart Web BTQ</h1>
                <p>Your one-stop solution for personalized learning and progression tracking.</p>
                <div>
                    <Link to="/register">Get Started</Link>
                    <span> or </span>
                    <Link to="/login">Login</Link>
                </div>
            </header>
            <section>
                <img src="path/to/your/banner/image.jpg" alt="App Banner" style={{ width: '100%', height: 'auto' }} />
            </section>
        </div>
    );
};

export default Home;