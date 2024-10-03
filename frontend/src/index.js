// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'; // Import global styles
import { AuthProvider } from './context/AuthContext'; // Context for authentication

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
