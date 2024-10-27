import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const InstructionPage = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/recording');
    };

    return (
        <div className='flex flex-col items-center text-nblack4'>
            <h1 className='font-bold text-4xl mb-2'>Instruksi</h1>
            <p className='text-sm mb-4'>Ikuti instruksi berikut untuk melakukan rekaman hafalan</p>

            <div className='flex flex-col w-[45ch] space-y-2 mb-4'>
                <div className='flex space-x-2 items-center'>
                    <div className='font-bold text-nwhite1 bg-nblue4 rounded-full py-1 px-4'>1</div>
                    <p>Mulai rekaman dengan menekan tombol <span className='font-bold'>Mulai</span></p>
                </div>
                <div className='flex space-x-2 items-center'>
                    <div className='font-bold text-nwhite1 bg-nblue4 rounded-full py-1 px-4'>2</div>
                    <p>Hentikan rekaman dengan menekan tombol <span className='font-bold'>Hentikan</span></p>
                </div>
                <div className='flex space-x-2 items-center'>
                    <div className='font-bold text-nwhite1 bg-nblue4 rounded-full py-1 px-4'>3</div>
                    <p>Submit rekaman dengan menekan tombol <span className='font-bold'>Submit</span></p>
                </div>
            </div>
            <Button onClick={handleStart}>Mulai</Button>
        </div>
    );
};

export default InstructionPage;