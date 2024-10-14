// frontend/src/pages/HafalanPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HafalanCard from '../components/HafalanCard';
import HafalanModal from '../components/HafalanModal';

const HafalanPage = () => {
    const [hafalanList, setHafalanList] = useState([]);
    const [selectedHafalan, setSelectedHafalan] = useState(null);

    useEffect(() => {
        const fetchHafalan = async () => {
            const { data } = await axios.get('/api/hafalan');
            setHafalanList(data);
        };
        fetchHafalan();
    }, []);

    const handleCardClick = (hafalan) => {
        setSelectedHafalan(hafalan);
    };

    const handleCloseModal = () => {
        setSelectedHafalan(null);
    };

    return (
        <div className='flex flex-col items-center px-6 py-32 text-nblack4'>
            <h1 className='font-bold text-4xl mb-4'>Halaman Hafalan</h1>
            <div className="flex flex-col space-y-6">
                {/* Display card using map */}
                {/* 
                {hafalanList.map(hafalan => (
                    <HafalanCard key={hafalan._id} hafalan={hafalan} onClick={() => handleCardClick(hafalan)} />
                ))}
                 */}

                {/* Temporary dummy */}
                <div className="bg-nwhite2 shadow-md p-6 w-[45ch] cursor-pointer" onClick={onClick}>
                    <h2>Surah Al-Fatihah</h2>
                    <p>Level: 1</p>
                </div>
                <div className="bg-nwhite2 shadow-md p-6 w-[45ch] cursor-pointer" onClick={onClick}>
                    <h2>Surah Al-Insyirah</h2>
                    <p>Level: 2</p>
                </div>
                <div className="bg-nwhite2 shadow-md p-6 w-[45ch] cursor-pointer" onClick={onClick}>
                    <h2>Surah Al-Ikhlas</h2>
                    <p>Level: 1</p>
                </div>
            </div>
            {selectedHafalan && (
                <HafalanModal hafalan={selectedHafalan} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default HafalanPage;