import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const RecordingPage = () => {
    const [recordingState, setRecordingState] = useState({
        isRecording: false,
        isPaused: false,
        audioUrl: null,
        isProcessing: false,
        resultMessage: null,
        finalScore: null
    });

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };
            mediaRecorderRef.current.start();

            setRecordingState((prevState) => ({
                ...prevState,
                isRecording: true,
                audioUrl: null,
                resultMessage: null,
                finalScore: null
            }));
        } catch (error) {
            console.error('Error accessing microphone:', error);
            setRecordingState((prevState) => ({
                ...prevState,
                resultMessage: 'Tidak dapat mengakses mikrofon. Silakan periksa izin Anda.'
            }));
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
            audioChunksRef.current = [];
            submitRecording(audioFile);
        };

        setRecordingState((prevState) => ({ ...prevState, isRecording: false, isProcessing: true }));
    };

    const submitRecording = async (audioFile) => {
        try {
            const formData = new FormData();
            formData.append('audioFile', audioFile);

            const response = await axios.post('http://localhost:5000/api/recordings', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
                }
            });

            const { finalScore } = response.data.recording;
            setRecordingState((prevState) => ({
                ...prevState,
                finalScore,
                resultMessage: finalScore >= 70 ? 'Selamat, Anda Lulus!' : 'Maaf, Anda Tidak Lulus. Silakan coba lagi.',
                isProcessing: false
            }));
        } catch (error) {
            console.error('Error submitting recording:', error);
            setRecordingState((prevState) => ({
                ...prevState,
                resultMessage: 'Terjadi kesalahan, silakan coba lagi.',
                isProcessing: false
            }));
        }
    };

    return (
        <div className='flex justify-center text-nblack4 px-6 py-44'>
            {!recordingState.isRecording && !recordingState.audioUrl && !recordingState.isProcessing && !recordingState.resultMessage && (
                <div className='flex flex-col items-center space-y-4'>
                    <h1 className='font-bold text-4xl'>Rekaman Hafalan</h1>
                    <div className='p-6 bg-nwhite2 shadow-sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                            <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                            <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                        </svg>
                    </div>
                    <button className='font-bold text-nwhite1 bg-nblue4 py-1 px-6 rounded-full hover:bg-nblue3' onClick={startRecording}>Mulai</button>
                </div>
            )}
            {recordingState.isRecording && !recordingState.isPaused && (
                <div className='flex flex-col items-center space-y-4'>
                    <p>Rekaman sedang berlangsung...</p>
                    <button onClick={stopRecording}>Berhenti</button>
                </div>
            )}
            {recordingState.isProcessing && (
                <div className='flex flex-col items-center space-y-4'>
                    <p>Rekaman sedang diproses...</p>
                </div>
            )}
            {recordingState.resultMessage && (
                <div className='flex flex-col items-center space-y-4'>
                    <p>{recordingState.resultMessage}</p>
                    {recordingState.finalScore !== null && <p>Nilai Akhir: {recordingState.finalScore}</p>}
                    <button onClick={() => window.location.href = '/dashboard'}>Kembali ke Dashboard</button>
                </div>
            )}
        </div>
    );
};

export default RecordingPage;