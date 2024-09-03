// frontend/src/pages/SubmitRecording.js
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SubmitRecording = () => {
    const [audioUrl, setAudioUrl] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/recordings', { audioUrl });
            alert('Selesai melakukan rekaman');
            history.push('/dashboard');
        } catch (err) {
            console.error(err.message);
            alert('Terjadi kesalahan, coba lagi nanti.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={audioUrl}
                onChange={(e) => setAudioUrl(e.target.value)}
                placeholder="Enter audio URL"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default SubmitRecording;