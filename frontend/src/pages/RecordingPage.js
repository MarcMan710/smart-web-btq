import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';

const RecordingPage = () => {
    const [recordingState, setRecordingState] = useState({
        isRecording: false,
        isPaused: false,
        audioUrl: null,
        isProcessing: false,
        resultMessage: null,
        score: null
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
                score: null
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

            const { score } = response.data.recording;
            setRecordingState((prevState) => ({
                ...prevState,
                score,
                resultMessage: score >= 70 ? 'Selamat, kamu lulus!' : 'Maaf, kamu belum lulus. Silakan coba lagi ...',
                isProcessing: false
            }));
        } catch (error) {
            console.error('Error submitting recording:', error);
            setRecordingState((prevState) => ({
                ...prevState,
                resultMessage: 'Terjadi kesalahan, silakan coba lagi ...',
                isProcessing: false
            }));
        }
    };

    const finalIcon = ({ score }) => {
        if (score === null) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 text-nred">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                </svg>
            );
        } else if (score >= 70) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 text-ngreen">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>
            );
        } else {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 text-nyellow">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
                </svg>
            );
        }
    };

    return (
        <div className='flex justify-center text-nblack4'>
            {!recordingState.isRecording && !recordingState.audioUrl && !recordingState.isProcessing && !recordingState.resultMessage && (
                <div className='flex flex-col items-center'>
                    <h1 className='font-bold text-4xl mb-2'>Rekaman</h1>
                    <p className='text-sm mb-4'>Klik <span className='font-bold'>Mulai</span> untuk memulai</p>
                    <div className='p-6 bg-nwhite2 shadow-md mb-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                            <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                            <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                        </svg>
                    </div>
                    <Button onClick={startRecording}>Mulai</Button>
                </div>
            )}
            {recordingState.isRecording && !recordingState.isPaused && (
                <div className='flex flex-col items-center'>
                    <h1 className='font-bold text-4xl mb-2'>Rekaman</h1>
                    <p className='text-sm mb-4'>Rekaman sedang berlangsung ...</p>
                    <div className='p-6 bg-nwhite2 shadow-md mb-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 text-ngreen">
                            <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                            <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                        </svg>
                    </div>
                    <Button onClick={stopRecording}>Berhenti</Button>
                </div>
            )}
            {recordingState.isProcessing && (
                <div className='flex flex-col items-center'>
                    <h1 className='font-bold text-4xl mb-2'>Rekaman</h1>
                    <p className='text-sm mb-4'>Memproses rekaman ...</p>
                    <div className='p-6 bg-nwhite2 shadow-md mb-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 text-ngreen">
                            <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                            <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                        </svg>
                    </div>
                </div>
            )}
            {recordingState.resultMessage && (
                <div className='flex flex-col items-center'>
                    <h1 className='font-bold text-4xl mb-2'>Rekaman</h1>
                    <p className='text-sm mb-4'>
                        {recordingState.resultMessage}
                    </p>
                    <div className='p-6 bg-nwhite2 shadow-md mb-2'>
                        {finalIcon(recordingState)}
                    </div>
                    {
                        recordingState.score !== null
                        && <p className='mb-2'>
                            Nilai Akhir: <span className='font-bold'>{recordingState.score}</span>
                        </p>
                    }
                    <div className='mt-2'>
                        <Button
                            onClick={() => window.location.href = '/dashboard'}
                            text='text-nblack4'
                            bg='bg-nwhite2'
                            hover='hover:bg-nwhite3'
                        >
                            Ke Dashboard
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecordingPage;