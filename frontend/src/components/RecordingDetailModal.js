// frontend/src/components/RecordingDetailModal.js
import React, { useState } from 'react';
import axios from 'axios';

const RecordingDetailModal = ({ recording, onClose, onReprocess, onApprove }) => {
    const [score, setScore] = useState(recording.aiResult?.score || '');
    const [feedback, setFeedback] = useState('');

    const handleApprove = async () => {
        try {
            await onApprove(recording._id, score, feedback);
            onClose();
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleReprocess = async () => {
        try {
            await onReprocess(recording._id);
            onClose();
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Detail Rekaman Hafalan</h2>
                <p>Nama: {recording.userName}</p>
                <p>AI Result: {recording.aiResult?.score || recording.aiResult?.error}</p>
                <p>Status: {recording.status}</p>
                <p>Date: {new Date(recording.date).toLocaleString()}</p>
                <label>
                    Score:
                    <input type="number" value={score} onChange={(e) => setScore(e.target.value)} />
                </label>
                <label>
                    Feedback:
                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                </label>
                <button onClick={handleApprove}>Beri Nilai</button>
                <button onClick={handleReprocess}>Hapus Penilaian AI</button>
                <button onClick={onClose}>Kembali</button>
            </div>
        </div>
    );
};

export default RecordingDetailModal;