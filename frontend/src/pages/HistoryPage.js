import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistoryPage = () => {
    const [recordings, setRecordings] = useState([]);

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/recordings/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
                    }
                });
                // Ensure the response contains the expected data structure
                if (response.data && Array.isArray(response.data)) {
                    setRecordings(response.data);
                } else {
                    console.error('Unexpected response structure:', response.data);
                }
            } catch (error) {
                console.error('Error fetching recordings:', error);
            }
        };

        fetchRecordings();
    }, []);

    return (
        <div className="history-page">
            <h1>History Page</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nama Hafalan</th>
                        <th>Final Score</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(recordings) && recordings.map((recording) => (
                        <tr key={recording._id}>
                            <td>Surah Al-Fatihah</td>
                            <td>{recording.finalScore}</td>
                            <td>{recording.passed ? 'Lulus' : 'Tidak Lulus'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryPage;