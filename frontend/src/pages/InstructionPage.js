// frontend/src/pages/InstructionPage.js
import React from 'react';
import { useHistory } from 'react-router-dom';

const InstructionPage = () => {
    const history = useHistory();

    const handleStart = () => {
        history.push('/submit-recording');
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