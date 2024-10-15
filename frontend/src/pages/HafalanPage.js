import React, { useState } from 'react';
import HafalanCard from '../components/HafalanCard';
import HafalanModal from '../components/HafalanModal';

const HafalanPage = () => {
    const [selectedHafalan, setSelectedHafalan] = useState(null);

    // Hardcoded list of hafalan
    const hafalanList = [
        { _id: '1', title: 'Hafalan 1', levelRequired: '1', description: 'Description for Hafalan 1' },
        { _id: '2', title: 'Hafalan 2', levelRequired: '2', description: 'Description for Hafalan 2' },
        { _id: '3', title: 'Hafalan 3', levelRequired: '3', description: 'Description for Hafalan 3' },
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
        <div className='flex flex-col items-center px-6 py-32 text-nblack4'>
            <h1 className='font-bold text-4xl mb-4'>Halaman Hafalan</h1>
            {renderHafalanCards()}
            {renderModal()}
        </div>
    );
};

export default HafalanPage;