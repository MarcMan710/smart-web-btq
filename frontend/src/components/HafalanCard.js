// frontend/src/components/HafalanCard.js
import React from 'react';

const HafalanCard = ({ hafalan, onClick }) => {
    return (
        <div className="bg-nwhite2 shadow-md p-6 w-[45ch] cursor-pointer" onClick={onClick}>
            <h2>{hafalan.title}</h2>
            <p>Level: {hafalan.levelRequired}</p>
        </div>
    );
};

export default HafalanCard;