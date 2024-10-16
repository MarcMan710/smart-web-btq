import React from 'react';
import { useNavigate } from 'react-router-dom';

const InstructionPage = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/recording');
    };

    return (
        <div className='flex flex-col items-center px-6 py-32 text-nblack4'>
            <h1 className='font-bold text-4xl'>Instruksi Rekaman Hafalan</h1>
            <p className='mb-4'>Ikuti instruksi berikut untuk melakukan rekaman hafalan.</p>
            {/* Step by step */}
            <div className='flex flex-col w-[45ch] space-y-2 mb-4'>
                <div className='flex space-x-2 items-center'>
                    <div className='font-bold text-nwhite1 bg-nblue4 rounded-full py-1 px-4'>1</div>
                    <p>Instruksi 1: Mulai rekaman</p>
                </div>
                <div className='flex space-x-2 items-center'>
                    <div className='font-bold text-nwhite1 bg-nblue4 rounded-full py-1 px-4'>2</div>
                    <p>Instruksi 2: Hentikan rekaman</p>
                </div>
                <div className='flex space-x-2 items-center'>
                    <div className='font-bold text-nwhite1 bg-nblue4 rounded-full py-1 px-4'>3</div>
                    <p>Instruksi 3: Submit rekaman</p>
                </div>
            </div>
            <button className='font-bold text-nwhite1 bg-nblue4 rounded-full px-6 py-1 hover:bg-nblue3' onClick={handleStart}>Mulai</button>
        </div>
    );
};

export default InstructionPage;