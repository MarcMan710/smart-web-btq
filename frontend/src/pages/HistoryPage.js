import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HistoryPage = () => {
    const [recordings, setRecordings] = useState([]);

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const response = await axios.get('/api/recordings/user');
                setRecordings(response.data);
            } catch (error) {
                console.error('Error fetching recordings:', error);
            }
        };

        fetchRecordings();
    }, []);

    return (
        <div className='flex flex-col items-center text-nblack4 space-y-6 mt-6 mb-32'>
            <h1 className='font-bold text-4xl'>Histori Rekaman</h1>
            {recordings.length === 0 ? (
                <p>Tidak ada Rekaman</p>
            ) : (
                <table className='min-w-full bg-white'>
                    <thead>
                        <tr>
                            <th className='py-2'>Nama Rekaman</th>
                            <th className='py-2'>Tanggal Rekaman</th>
                            <th className='py-2'>File Rekaman</th>
                            <th className='py-2'>Nilai Akhir</th>
                            <th className='py-2'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recordings.map((recording) => (
                            <tr key={recording._id} className='text-center'>
                                <td className='py-2'>{recording.hafalan.title}</td>
                                <td className='py-2'>{new Date(recording.date).toLocaleDateString()}</td>
                                <td className='py-2'>
                                    <a href={`/${recording.audioUrl}`} target='_blank' rel='noopener noreferrer'>
                                        Download
                                    </a>
                                </td>
                                <td className='py-2'>{recording.finalScore}</td>
                                <td className='py-2'>{recording.passed ? 'Lulus' : 'Tidak Lulus'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default HistoryPage;