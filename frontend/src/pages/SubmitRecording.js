// frontend/src/pages/SubmitRecording.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SubmitRecording = () => {
    const [audioUrl, setAudioUrl] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/recordings', { audioUrl });
            alert('Selesai melakukan rekaman');
            navigate.push('/dashboard');
        } catch (err) {
            console.error(err.message);
            alert('Terjadi kesalahan, coba lagi nanti.');
        }
    };

    return (
        <div className='flex flex-col items-center px-6 py-32 text-nblack4'>
            <h1 className='font-bold text-4xl'>Proses Rekaman</h1>
            <p className='mb-4'>Masukan url rekaman untuk mengirim.</p>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col items-center space-y-4'>
                    {/* Logo */}
                    <div className='p-6 bg-nwhite2 shadow-sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                            <path fill-rule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={audioUrl}
                        onChange={(e) => setAudioUrl(e.target.value)}
                        placeholder="Enter audio URL"
                        className='px-2 py-1 rounded-md'
                    />
                    <button className='font-bold px-6 py-1 text-nwhite1 bg-nblue4 rounded-full hover:bg-nblue3' type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default SubmitRecording;