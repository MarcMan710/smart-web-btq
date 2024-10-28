// frontend/src/pages/About.js
import React from 'react';

const About = () => {
    return (
        <div className='flex flex-col items-center text-nblack4'>
            <h1 className='font-bold text-4xl mb-2'>Tentang</h1>
            <p className='w-[45ch] text-center text-sm mb-4'>
                <span className='font-bold text-nblue4'>Smart Web BTQ </span>
                adalah aplikasi pembelajaran baca tulis Al-Qur'an yang memanfaatkan
                teknologi AI untuk proses penilaian otomatis
            </p>

            <h2 className='font-semibold text-xl mb-2'>Pengembang</h2>
            <div className='flex justify-center items-center space-x-6'>
                <div className='bg-nwhite2 shadow-md rounded-md p-6 flex items-center space-x-2 w-[45ch]'>
                    <div className='text-nblue1'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-16">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p className='font-semibold'>Kemal Nur Rachman</p>
                        <p className='text-sm'>Backend Developer</p>
                        <p className='text-sm'>kemal.nurr20@mhs.uinjkt.ac.id</p>
                    </div>
                </div>

                <div className='bg-nwhite2 shadow-md rounded-md p-6 flex items-center space-x-2 w-[45ch]'>
                    <div className='text-nblue1'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-16">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p className='font-semibold'>Adam Marsa Rachman</p>
                        <p className='text-sm'>Frontend Developer</p>
                        <p className='text-sm'>adam.rachman20@mhs.uinjkt.ac.id</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;