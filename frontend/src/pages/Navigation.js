import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
            <ul>
                {/* Other navigation links */}
                <li><Link to="/add-hafalan">Add Hafalan</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;