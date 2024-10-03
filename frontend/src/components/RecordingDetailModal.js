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
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-nblack4/30">
            <div className="relative w-[75ch] p-6 bg-nwhite1 rounded-md text-nblack4">
                <span className="absolute font-bold text-lg top-2 right-3 cursor-pointer bg-nwhite2 px-2 rounded-full hover:bg-nwhite3" onClick={onClose}>&times;</span>
                <h2 className='font-semibold'>Detail Rekaman Hafalan</h2>
                <p>Nama: {recording.userName}</p>
                <p>AI Result: {recording.aiResult?.score || recording.aiResult?.error}</p>
                <p>Status: {recording.status}</p>
                <p className='mb-6'>Date: {new Date(recording.date).toLocaleString()}</p>
                {/* Reformatted for easier styling */}
                {/* <label>
                    Score:
                    <input type="number" value={score} onChange={(e) => setScore(e.target.value)} />
                </label>
                <label>
                    Feedback:
                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                </label> */}
                <div className='flex space-x-9 mb-2'>
                    <label htmlFor='number'>Score:</label>
                    <input className='px-2 py-1 rounded-md w-[6ch]' type='number' id='number' value={score} onChange={(e) => setScore(e.target.value)} />
                </div>
                <div className='flex space-x-2 mb-8'>
                    <label htmlFor='feedback'>Feedback:</label>
                    <textarea className='px-2 py-1 rounded-md w-[45ch] h-[14ch]' id='feedback' value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                </div>
                <div className='flex space-x-2'>
                    <button className='font-semibold text-nwhite1 bg-nblue4 py-1 px-4 rounded-full hover:bg-nblue1' onClick={handleApprove}>Beri Nilai</button>
                    <button className='font-semibold text-nwhite1 bg-nblue4 py-1 px-4 rounded-full hover:bg-nblue1' onClick={handleReprocess}>Hapus Penilaian AI</button>
                    <button className='font-semibold bg-nwhite2 py-1 px-4 rounded-full hover:bg-nwhite3' onClick={onClose}>Kembali</button>
                </div>
            </div>
        </div>
    );
};

export default RecordingDetailModal;