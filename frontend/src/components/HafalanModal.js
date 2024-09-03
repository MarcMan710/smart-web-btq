// frontend/src/components/HafalanModal.js
import React from 'react';
import { useHistory } from 'react-router-dom';

const HafalanModal = ({ hafalan, onClose }) => {
    const history = useHistory();

    const handleStartHafalan = () => {
        history.push(`/recording/${hafalan._id}`);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{hafalan.title}</h2>
                <p>{hafalan.description}</p>
                <p>Level: {hafalan.levelRequired}</p>
                <button onClick={handleStartHafalan}>Mulai Hafalan</button>
                <button onClick={onClose}>Kembali</button>
            </div>
        </div>
    );
};

export default HafalanModal;