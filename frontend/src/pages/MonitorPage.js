// frontend/src/pages/MonitorPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecordingDetailModal from '../components/RecordingDetailModal';

const MonitorPage = () => {
    const [students, setStudents] = useState([]);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('date');
    const [selectedRecording, setSelectedRecording] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get('/api/instructors/students');
                setStudents(res.data);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchStudents();
    }, []);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const handleRecordingClick = (recording) => {
        setSelectedRecording(recording);
    };

    const handleCloseModal = () => {
        setSelectedRecording(null);
    };

    const handleReprocessRecording = async (id) => {
        try {
            await axios.post(`/api/recordings/${id}/reprocess`);
            // Refresh data if needed
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleApproveRecording = async (id, score, feedback) => {
        try {
            await axios.post(`/api/recordings/${id}/approve`, { score, feedback });
            // Refresh data if needed
        } catch (err) {
            console.error(err.message);
        }
    };

    const filteredStudents = students
        .filter(student => student.status.includes(filter))
        .sort((a, b) => {
            if (sort === 'date') {
                return new Date(b.date) - new Date(a.date);
            } else if (sort === 'score') {
                return b.aiResult.score - a.aiResult.score;
            }
            return 0;
        });

    return (
        <div className='flex flex-col items-center px-6 py-10 text-nblack4'>
            <h1 className='font-bold text-4xl mb-4'>Monitor Pengguna</h1>
            {/* Reformatted for easier styling */}
            {/* <div>
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
            </div> */}
            <div className='flex flex-col mb-4'>
                <div className='flex items-center space-x-2 mb-1'>
                    <label htmlFor='filter'>Filter by status:</label>
                    <input className='px-2 py-1 rounded-md' type="text" id='filter' value={filter} onChange={handleFilterChange} />
                </div>
                <div className='flex items-center space-x-2'>
                    <label htmlFor='sort'>Sort by:</label>
                    <select id='sort' value={sort} onChange={handleSortChange}>
                        <option value="date">Date</option>
                        <option value="score">Score</option>
                    </select>
                </div>
            </div>
            <ul className='flex flex-col items-center space-y-6'>
                {filteredStudents.map(student => (
                    <li className='p-6 bg-nwhite2 shadow-md w-[45ch]' key={student.id} onClick={() => handleRecordingClick(student.recording)}>
                        <p>Nama: {student.name}</p>
                        <p>AI Result: {student.aiResult.score || student.aiResult.error}</p>
                        <p>Passed: {student.passed ? 'Yes' : 'No'}</p>
                        <p>Status: {student.status}</p>
                        <p>Instructor Review: {student.instructorReview}</p>
                        <p>Date: {new Date(student.date).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
            {selectedRecording && (
                <RecordingDetailModal
                    recording={selectedRecording}
                    onClose={handleCloseModal}
                    onReprocess={handleReprocessRecording}
                    onApprove={handleApproveRecording}
                />
            )}
        </div>
    );
};

export default MonitorPage;