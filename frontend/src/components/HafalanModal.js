import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const HafalanModal = ({ hafalan, onClose }) => {
    const navigate = useNavigate();

    const handleStartHafalan = () => {
        navigate('/instruction'); // Navigate to the InstructionPage
    };

    return (
        <div
            className="
            fixed top-0 left-0 w-full h-full
            flex justify-center items-center
            bg-gradient-to-r from-nblue1/80 to-nblue4/80
            z-10
            "
        >
            <div className="relative w-[45ch] p-6 bg-nwhite1 rounded-md shadow-lg text-nblack4">
                <span
                    className="
                absolute font-bold text-lg top-2 right-3 cursor-pointer
                bg-nwhite2 px-2 rounded-full hover-bg-nwhite3
                "
                    onClick={onClose}
                >
                    &times;
                </span>

                <h1 className='font-bold mb-2'>{hafalan.title}</h1>
                <p className='text-sm mb-4'>{hafalan.description}</p>
                <div className='flex space-x-4'>
                    <Button onClick={handleStartHafalan}>Mulai Hafalan</Button>
                    <Button
                        onClick={onClose}
                        text='text-nblack4'
                        bg='bg-nwhite2'
                        hover='hover:bg-nwhite3'
                    >
                        Kembali
                    </Button>
                    {/* <button className='font-semibold text-nwhite1 bg-nblue4 py-1 px-4 rounded-full hover-bg-nblue1' onClick={handleStartHafalan}>Mulai Hafalan</button>
                    <button className='font-semibold bg-nwhite2 py-1 px-4 rounded-full hover-bg-nwhite3' onClick={onClose}>Kembali</button> */}
                </div>
            </div>
        </div>
    );
};

export default HafalanModal;