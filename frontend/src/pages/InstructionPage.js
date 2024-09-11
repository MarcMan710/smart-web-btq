// frontend/src/pages/InstructionPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const InstructionPage = () => {
    const navigate  = useNavigate();

    const handleStart = () => {
        navigate.push('/submit-recording');
    };

    return (
        <div>
            <h1>Instruksi Rekaman Hafalan</h1>
            <p>Ikuti instruksi berikut untuk melakukan rekaman hafalan...</p>
            <button onClick={handleStart}>Mulai</button>
        </div>
    );
};

export default InstructionPage;