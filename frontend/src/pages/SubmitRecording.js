// frontend/src/pages/SubmitRecording.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SubmitRecording = () => {
    const [audioUrl, setAudioUrl] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/recordings', { audioUrl });
            alert('Selesai melakukan rekaman');
            navigate.push('/dashboard');
        } catch (err) {
            console.error(err.message);
            alert('Terjadi kesalahan, coba lagi nanti.');
        }
    };

    return (
        <div>
            <h1>Proses Rekaman</h1>
            <p>Ikuti panduan visual dan audio berikut untuk melakukan rekaman...</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={audioUrl}
                    onChange={(e) => setAudioUrl(e.target.value)}
                    placeholder="Enter audio URL"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SubmitRecording;