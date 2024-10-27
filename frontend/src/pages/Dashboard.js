import React, { useEffect, useState, useContext } from 'react';
import api from '../axiosConfig';
import AuthContext from '../context/AuthContext';
import HafalanCard from '../components/HafalanCard';
import HafalanModal from '../components/HafalanModal';
import { useNavigate } from 'react-router-dom'; // Updated import

const Dashboard = () => {
    const [selectedHafalan, setSelectedHafalan] = useState(null);
    const { authState } = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const navigate = useNavigate(); // Updated hook

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await api.get('/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${authState.token}`
                    }
                });
                setFirstName(res.data.firstName);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchUserData();
    }, [authState.token]);

    // Hardcoded list of hafalan
    const hafalanList = [
        { _id: '1', title: 'Surah Al-Fatihah', levelRequired: '1', description: 'Surah Al-Fatihah adalah Surah pertama dalam Kitab Al-Quran' }
    ];

    const handleCardClick = (hafalan) => {
        setSelectedHafalan(hafalan);
        navigate('/recording', { state: { selectedHafalan: hafalan } });
    };

    const handleCloseModal = () => {
        setSelectedHafalan(null);
    };

    const renderHafalanCards = () => (
        <div className="flex flex-col space-y-4">
            {hafalanList.map(hafalan => (
                <HafalanCard
                    key={hafalan._id}
                    hafalan={hafalan}
                    onClick={() => handleCardClick(hafalan)}
                />
            ))}
        </div>
    );

    const renderModal = () => (
        selectedHafalan && (
            <HafalanModal
                hafalan={selectedHafalan}
                onClose={handleCloseModal}
            />
        )
    );

    return (
        <div className='flex flex-col items-center text-nblack4'>
            <h1 className='font-bold text-4xl mb-2'>Assalamualaikum, {firstName}!</h1>
            <p className='text-sm text-nblack1 mb-4'>
                Berikut adalah daftar hafalan yang bisa kamu lakukan
            </p>

            {renderHafalanCards()}
            {renderModal()}
        </div>
    );
};

export default Dashboard;