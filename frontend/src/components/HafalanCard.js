// frontend/src/components/HafalanCard.js
import React from 'react';

const HafalanCard = ({ hafalan, onClick }) => {
    return (
        <div className="hafalan-card" onClick={onClick}>
            <h2>{hafalan.title}</h2>
            <p>Level: {hafalan.levelRequired}</p>
        </div>
    );
};

export default HafalanCard;