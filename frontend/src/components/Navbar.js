// frontend/src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const res = await axios.get('/api/users/me'); // Assuming this endpoint returns the current user data
                setRole(res.data.role);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchUserRole();
    }, []);

    const handleLogout = () => {
        // Hapus token autentikasi dari local storage
        localStorage.removeItem('authToken');
        // Arahkan pengguna ke halaman login
        navigate.push('/login');
    };

    return (
        <nav>
            <ul>
                <li><Link to="/recordings">Halaman Hafalan</Link></li>
                <li><Link to="/profile">Halaman Profil</Link></li>
                <li><Link to="/about">Halaman Tentang</Link></li>
                {role === 'Instructor' && <li><Link to="/monitor">Halaman Monitor Pengguna</Link></li>}
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;