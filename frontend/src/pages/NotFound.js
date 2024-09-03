// frontend/src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <h2>Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">Go Back Home</Link>
        </div>
    );
};

export default NotFound;
