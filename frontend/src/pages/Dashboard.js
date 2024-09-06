// frontend/src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [progress, setProgress] = useState(null);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('date');

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

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const filteredRecordings = progress?.recordings
        .filter(record => record.status.includes(filter))
        .sort((a, b) => {
            if (sort === 'date') {
                return new Date(b.date) - new Date(a.date);
            } else if (sort === 'score') {
                return b.aiResult.score - a.aiResult.score;
            }
            return 0;
        });

    if (!progress) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Role: {progress.role}</p>
            <p>Level: {progress.level}</p>
            <h2>Recording History</h2>
            <div>
                <label>
                    Filter by status:
                    <input type="text" value={filter} onChange={handleFilterChange} />
                </label>
                <label>
                    Sort by:
                    <select value={sort} onChange={handleSortChange}>
                        <option value="date">Date</option>
                        <option value="score">Score</option>
                    </select>
                </label>
            </div>
            <ul>
                {filteredRecordings.map(record => (
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