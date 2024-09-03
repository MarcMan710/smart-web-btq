// frontend/src/pages/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [progress, setProgress] = useState(null);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await axios.get('/api/users/progress');
                setProgress(res.data);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchProgress();
    }, []);

    if (!progress) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Role: {progress.role}</p>
            <p>Level: {progress.level}</p>
            <h2>Recording History</h2>
            <ul>
                {progress.recordings.map(record => (
                    <li key={record.id}>
                        <p>Audio URL: {record.audioUrl}</p>
                        <p>AI Result: {record.aiResult.score || record.aiResult.error}</p>
                        <p>Passed: {record.passed ? 'Yes' : 'No'}</p>
                        <p>Status: {record.status}</p>
                        <p>Instructor Review: {record.instructorReview}</p>
                        <p>Date: {new Date(record.date).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;