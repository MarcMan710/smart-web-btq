// frontend/src/components/LevelCard.js
import React from 'react';

const LevelCard = ({ level }) => {
    return (
        <div className="level-card">
            <h3>{level.name}</h3>
            <p>{level.description}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default LevelCard;
