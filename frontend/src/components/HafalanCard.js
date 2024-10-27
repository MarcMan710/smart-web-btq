// frontend/src/components/HafalanCard.js
import React from 'react';

const HafalanCard = ({ hafalan, onClick }) => {
    return (
        <div
            className="bg-gradient-to-r from-nblue1/30 to-nblue1/80 shadow-md rounded-md p-6 w-[45ch] cursor-pointer"
            onClick={onClick}
        >
            <h2 className='font-bold'>{hafalan.title}</h2>
        </div>
    );
};

export default HafalanCard;