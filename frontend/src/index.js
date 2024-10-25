// frontend/src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Import global styles
import { AuthProvider } from './context/AuthContext'; // Context for authentication

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);