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
        <div className='flex flex-col items-center px-6 py-10 text-nblack4'>
            <h1 className='font-bold text-4xl mb-2'>Dashboard</h1>
            <div className='flex flex-col mb-4'>
                <p>Level: {progress.level}</p>
            </div>

            <h2 className='font-semibold text-xl mb-2'>Recording History</h2>
            <div className='flex flex-col mb-4'>
                <div className='flex items-center space-x-3 mb-1'>
                    <label htmlFor='filter'>Filter by status:</label>
                    <input className='px-2 py-1 rounded-md' type="text" id='filter' value={filter} onChange={handleFilterChange} />
                </div>
                <div className='flex items-center space-x-4'>
                    <label htmlFor='sort'>Sort by status:</label>
                    <select id='sort' value={sort} onChange={handleSortChange}>
                        <option value="date">Date</option>
                        <option value="score">Score</option>
                    </select>
                </div>
            </div>
            <ul className='flex flex-col items-center space-y-6'>
                {filteredRecordings.map(record => (
                    <li className='p-6 bg-nwhite2 shadow-md w-[45ch]' key={record.id}>
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