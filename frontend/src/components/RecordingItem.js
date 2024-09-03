// frontend/src/components/RecordingItem.js
import React from 'react';

const RecordingItem = ({ recording }) => {
    return (
        <div className="recording-item">
            <p>{recording.title}</p>
            <audio controls src={recording.url}></audio>
            {/* Add more details or actions as needed */}
        </div>
    );
};

export default RecordingItem;
