import React, { useState } from 'react';
import axios from 'axios';

const RecordingPage = ({ selectedHafalan }) => {
    const [recordingState, setRecordingState] = useState({
        isRecording: false,
        isPaused: false,
        audioUrl: null,
        isProcessing: false,
        resultMessage: null,
        finalScore: null
    });

    const { isRecording, isPaused, isProcessing, resultMessage, finalScore } = recordingState;

    const startRecording = () => {
        setRecordingState({
            isRecording: true,
            audioUrl: null,
            resultMessage: null,
            finalScore: null,
            ...recordingState
        });
        // Logic to start recording audio
    };

    const stopRecording = (chunks) => {
        setRecordingState({ ...recordingState, isRecording: false, isProcessing: true });
        // Logic to stop recording and get the audio Blob
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
        submitRecording(audioFile);
    };
    const submitRecording = async (audioFile) => {
        try {
            const formData = new FormData();
            formData.append('audioFile', audioFile);
            formData.append('hafalanId', selectedHafalan.id);

            const response = await axios.post('/api/recordings', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { finalScore } = response.data.recording;
            setRecordingState({
                finalScore,
                resultMessage: finalScore >= 70 ? 'Selamat, Anda Lulus!' : 'Coba Lagi, Anda Tidak Lulus.',
                isProcessing: false,
                ...recordingState
            });
        } catch (error) {
            console.error('Error submitting recording:', error);
            setRecordingState({
                resultMessage: 'Terjadi kesalahan, silakan coba lagi.',
                isProcessing: false,
                ...recordingState
            });
        }
    };

    return (
        <div className='flex justify-center text-nblack4 px-6 py-44'>
            {!isRecording && !recordingState.audioUrl && !isProcessing && !resultMessage && (
                <div className='flex flex-col items-center space-y-4'>
                    <h1 className='font-bold text-4xl'>Halaman Rekaman</h1>
                    <h2>{selectedHafalan ? selectedHafalan.title : 'No Hafalan selected'}</h2>
                    <div className='p-6 bg-nwhite2 shadow-sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                            <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                            <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                        </svg>
                    </div>
                    <button className='font-bold text-nwhite1 bg-nblue4 py-1 px-6 rounded-full hover:bg-nblue3' onClick={startRecording}>Mulai</button>
                </div>
            )}
            {isRecording && !isPaused && (
                <div className='flex flex-col items-center space-y-4'>
                    <p>Rekaman sedang berlangsung...</p>
                    <button onClick={stopRecording}>Berhenti</button>
                </div>
            )}
            {isProcessing && (
                <div className='flex flex-col items-center space-y-4'>
                    <p>Rekaman sedang diproses...</p>
                </div>
            )}
            {resultMessage && (
                <div className='flex flex-col items-center space-y-4'>
                    <p>{resultMessage}</p>
                    {finalScore !== null && <p>Nilai Akhir: {finalScore}</p>}
                    <button onClick={() => window.location.href = '/dashboard'}>Kembali ke Dashboard</button>
                </div>
            )}
        </div>
    );
};

export default RecordingPage;