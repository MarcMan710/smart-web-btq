import React from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import

const HafalanModal = ({ hafalan, onClose }) => {
    const navigate = useNavigate(); // Updated from useHistory to useNavigate

    const handleStartHafalan = () => {
        navigate(`/recording/${hafalan._id}`); // Updated from history.push to navigate
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