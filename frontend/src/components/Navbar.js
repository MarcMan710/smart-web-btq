import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { authState, logout } = useContext(AuthContext);

    // Function to handle logout
    const handleLogout = () => {
        logout(); // Call the logout function from AuthContext
        navigate('/login');
    };

    // Array of navigation links
    const navLinks = [
        { to: '/dashboard', text: 'Dashboard' },
        { to: '/history', text: 'Histori' },
        { to: '/profile', text: 'Profil' },
        { to: '/about', text: 'Tentang' }
    ];

    return (
        <nav className='flex justify-between items-center py-4 px-20'>
            <div className='flex items-center space-x-1'>
                <div className='text-nblue1'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                    </svg>
                </div>
                <p className='font-bold text-nblack4 text-lg'>Smart Web BTQ</p>
            </div>

            <ul className='flex items-center'>
                {navLinks.map(({ to, text }) => (
                    <li key={to} className='text-nblack4 px-3 py-2 rounded-md hover:bg-nblue1/20'>
                        <Link to={to}>{text}</Link>
                    </li>
                ))}
                <li className='text-nblack4 px-3 py-2 rounded-md hover:bg-nred/20'>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;