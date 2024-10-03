import React from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import

const HafalanModal = ({ hafalan, onClose }) => {
    const navigate = useNavigate(); // Updated from useHistory to useNavigate

    const handleStartHafalan = () => {
        navigate(`/recording/${hafalan._id}`); // Updated from history.push to navigate
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-nblack4/30">
            <div className="relative w-[45ch] p-6 bg-nwhite1 rounded-md text-nblack4">
                <span className="absolute font-bold text-lg top-2 right-3 cursor-pointer bg-nwhite2 px-2 rounded-full hover:bg-nwhite3" onClick={onClose}>
                    &times;
                </span>
                <h2 className='font-semibold'>{hafalan.title}</h2>
                <p>{hafalan.description}</p>
                <p className='mb-4'>Level: {hafalan.levelRequired}</p>
                <div className='flex space-x-4'>
                    <button className='font-semibold text-nwhite1 bg-nblue4 py-1 px-4 rounded-full hover:bg-nblue1' onClick={handleStartHafalan}>Mulai Hafalan</button>
                    <button className='font-semibold bg-nwhite2 py-1 px-4 rounded-full hover:bg-nwhite3' onClick={onClose}>Kembali</button>
                </div>
            </div>
        </div>
    );
};

export default HafalanModal;