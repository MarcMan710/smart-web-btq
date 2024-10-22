import React, { useEffect, useState } from 'react';
import HafalanCard from '../components/HafalanCard';
import HafalanModal from '../components/HafalanModal';

const Dashboard = () => {
    const [selectedHafalan, setSelectedHafalan] = useState(null);

    // Hardcoded list of hafalan
    const hafalanList = [
        { _id: '1', title: 'Surah Al-Fatihah', levelRequired: '1', description: 'Surah Al-Fatihah adalah Surah pertama dalam Kitab Al-Quran' }
    ];

    const handleCardClick = (hafalan) => {
        setSelectedHafalan(hafalan);
    };

    const handleCloseModal = () => {
        setSelectedHafalan(null);
    };

    const renderHafalanCards = () => (
        <div className="flex flex-col space-y-6">
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
        <div className='flex flex-col items-center px-6 py-10 text-nblack4'>
            <h1 className='font-bold text-4xl mb-2'>Assalamualaikum!</h1>
            {renderHafalanCards()}
            {renderModal()}
        </div>
    );
};

export default Dashboard;