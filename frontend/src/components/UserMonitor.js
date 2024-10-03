import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const UserMonitor = () => {
    const [recordings, setRecordings] = useState([]);
    const [selectedRecording, setSelectedRecording] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [score, setScore] = useState('');
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const res = await axios.get('/api/recordings');
                setRecordings(res.data);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchRecordings();
    }, []);

    const openModal = async (recordingId) => {
        try {
            const res = await axios.get(`/api/recordings/${recordingId}`);
            setSelectedRecording(res.data);
            setModalIsOpen(true);
        } catch (err) {
            console.error(err.message);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedRecording(null);
        setScore('');
        setFeedback('');
    };

    const handleReprocess = async () => {
    try {
        const res = await axios.post(`/api/recordings/${selectedRecording.id}/reprocess`);
        alert('Rekaman sedang diproses ulang');
        closeModal();
    } catch (err) {
        console.error(err.message);
        alert('Gagal memproses ulang rekaman');
    }
};

    const handleDeleteAIResult = async () => {
        try {
            await axios.delete(`/api/recordings/${selectedRecording.id}/aiResult`);
            alert('Hasil penilaian AI telah dihapus');
            closeModal();
        } catch (err) {
            console.error(err.message);
            alert('Gagal menghapus hasil penilaian AI');
        }
    };

    const handleScoreSubmit = async () => {
        try {
            const res = await axios.post(`/api/recordings/${selectedRecording.id}/approve`, { score });
            const { promotionMessage } = res.data;
            if (promotionMessage) {
                alert(promotionMessage);
            } else if (score >= 70) {
                alert('Selamat, Anda Lulus!');
            } else {
                alert('Score and feedback submitted successfully');
            }
            closeModal();
        } catch (err) {
            console.error(err.message);
            alert('Failed to submit score and feedback');
        }
    };

    return (
        <div>
            <h1>Monitor Pengguna</h1>
            <ul>
                {recordings.map(recording => (
                    <li key={recording.id} onClick={() => openModal(recording.id)}>
                        {recording.audioUrl}
                    </li>
                ))}
            </ul>

            {selectedRecording && (
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                    <h2>Detail Rekaman</h2>
                    <p>Audio URL: {selectedRecording.audioUrl}</p>
                    <p>Status: {selectedRecording.status}</p>
                    <p>AI Result: {selectedRecording.aiResult ? selectedRecording.aiResult.score : 'N/A'}</p>
                    <div>
                        <label>
                            Score:
                            <input type="number" value={score} onChange={(e) => setScore(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Feedback:
                            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                        </label>
                    </div>
                    <button onClick={handleScoreSubmit}>Beri Nilai</button>
                    <button onClick={handleReprocess}>Proses Ulang</button>
                    <button onClick={handleDeleteAIResult}>Hapus Penilaian AI</button>
                    <button onClick={closeModal}>Close</button>
                </Modal>
            )}
        </div>
    );
};

export default UserMonitor;