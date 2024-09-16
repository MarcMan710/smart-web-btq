// frontend/src/pages/About.js
import React from 'react';
import Footer from '../components/Footer';

const About = () => {
    return (
        <div className='flex flex-col items-center px-6 py-32 text-nblack4'>
            <h1 className='font-bold text-4xl'>Smart Web BTQ</h1>
            <p className='w-[45ch] text-center text-sm mb-6'>Adalah aplikasi pembelajaran baca tulis Al-Qur'an yang memanfaatkan teknologi AI untuk proses penilaian otomatis.</p>

            <h2 className='font-semibold mb-4 text-xl'>Pengembang</h2>
            <div className='flex justify-center items-center space-x-6 w-full'>
                <div className='bg-nwhite2 shadow-md rounded-md p-6 flex items-center space-x-2 flex-1 max-w-[40ch]'>
                    <div className='text-nblue1'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-16">
                            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p className='font-semibold'>Kemal Nur Rachman</p>
                        <p className='text-sm'>Backend Developer</p>
                        <p className='text-sm'>kemal@example.com</p>
                    </div>
                </div>

                <div className='bg-nwhite2 shadow-md rounded-md p-6 flex items-center space-x-2 flex-1 max-w-[40ch]'>
                    <div className='text-nblue1'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-16">
                            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p className='font-semibold'>Adam Marsa Rachman</p>
                        <p className='text-sm'>Frontend Developer</p>
                        <p className='text-sm'>adam.rachman20@mhs.uinjkt.ac.id</p>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default About;