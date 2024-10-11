// frontend/src/pages/HafalanPage.js
import React, { useContext, useState } from 'react';
import HafalanCard from '../components/HafalanCard';
import HafalanModal from '../components/HafalanModal';
import HafalanContext from '../context/HafalanContext';

const HafalanPage = () => {
    const { hafalanList, loading, error } = useContext(HafalanContext);
    const [selectedHafalan, setSelectedHafalan] = useState(null);

    const handleCardClick = (hafalan) => {
        setSelectedHafalan(hafalan);
    };

    const handleCloseModal = () => {
        setSelectedHafalan(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='flex flex-col items-center px-6 py-32 text-nblack4'>
            <h1 className='font-bold text-4xl mb-4'>Halaman Hafalan</h1>
            <div className="flex flex-col space-y-6">
                {hafalanList.map(hafalan => (
                    <HafalanCard key={hafalan._id} hafalan={hafalan} onClick={() => handleCardClick(hafalan)} />
                ))}
            </div>
            {selectedHafalan && (
                <HafalanModal hafalan={selectedHafalan} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default HafalanPage;