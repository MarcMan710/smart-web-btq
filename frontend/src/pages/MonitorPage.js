// frontend/src/pages/MonitorPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MonitorPage = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get('/api/users/students'); // Assuming this endpoint returns all students
                setStudents(res.data);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div>
            <h1>Monitor Pengguna</h1>
            {students.map(student => (
                <div key={student.id}>
                    <h2>{student.name}</h2>
                    <p>Role: {student.role}</p>
                    <p>Level: {student.level}</p>
                    <h3>Recording History</h3>
                    <ul>
                        {student.recordings.map(record => (
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
            ))}
        </div>
    );
};

export default MonitorPage;