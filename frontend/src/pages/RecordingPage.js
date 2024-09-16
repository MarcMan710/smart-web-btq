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
        <div className='flex justify-center text-nblack4 px-6 py-44'>
            {!isRecording && !audioUrl && (
                <div className='flex flex-col items-center space-y-4'>
                    <h1 className='font-bold text-4xl'>Halaman Rekaman</h1>
                    {/* Logo */}
                    <div className='p-6 bg-nwhite2 shadow-sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                            <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                            <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                        </svg>
                    </div>
                    <button className='font-bold text-nwhite1 bg-nblue4 py-1 px-6 rounded-full hover:bg-nblue3' onClick={startRecording}>Mulai</button>
                </div>
            )}
            {isRecording && (
                <div className='flex flex-col items-center space-y-4'>
                    <h1 className='font-bold text-4xl'>Halaman Rekaman</h1>
                    {/* Logo */}
                    <div className='p-6 bg-nwhite2 shadow-sm text-ngreen'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                            <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                            <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                        </svg>
                    </div>
                    <p>Rekaman sedang berlangsung ...</p>
                    <button className='font-bold text-nwhite1 bg-nblue4 py-1 px-6 rounded-full hover:bg-nblue3' onClick={stopRecording}>Selesai</button>
                </div>
            )}
            {audioUrl && (
                <div className='flex flex-col items-center space-y-4'>
                    <h1 className='font-bold text-4xl'>Halaman Rekaman</h1>
                    {/* Logo */}
                    <div className='p-6 bg-nwhite2 shadow-sm text-ngreen'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <p>Rekaman selesai dan sedang diproses ...</p>
                </div>
            )}
        </div>
    );
};

export default RecordingPage;