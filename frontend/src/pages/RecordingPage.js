import React, { useState } from 'react';
import axios from 'axios';

const RecordingPage = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);

    const startRecording = () => {
        setIsRecording(true);
        // Logic to start recording audio
    };

    const stopRecording = () => {
        setIsRecording(false);
        // Logic to stop recording and get the audio URL
        const recordedAudioUrl = 'path/to/recorded/audio'; // Replace with actual logic
        setAudioUrl(recordedAudioUrl);
        submitRecording(recordedAudioUrl);
    };

    const submitRecording = async (audioUrl) => {
        try {
            const response = await axios.post('/api/recordings', { audioUrl });
            console.log('Recording submitted and processed:', response.data);
        } catch (error) {
            console.error('Error submitting recording:', error);
        }
    };

    return (
        <div>
            {!isRecording && !audioUrl && (
                <div>
                    <h1>Halaman Instruksi</h1>
                    <button onClick={startRecording}>Mulai</button>
                </div>
            )}
            {isRecording && (
                <div>
                    <h1>Rekaman sedang berlangsung...</h1>
                    <button onClick={stopRecording}>Selesai</button>
                </div>
            )}
            {audioUrl && (
                <div>
                    <h1>Rekaman selesai dan sedang diproses...</h1>
                </div>
            )}
        </div>
    );
};

export default RecordingPage;