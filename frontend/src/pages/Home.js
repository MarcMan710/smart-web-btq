// frontend/src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <header className="flex flex-col items-center max-w-[45ch] text-center">
        <h1 className="text-4xl font-bold text-nblack4 mb-2">
          Selamat datang di Smart Web BTQ
        </h1>
        <p className="text-sm text-nblack1 mb-4">
          Solusi lengkap untuk pembelajaran Al-Qur'an menggunakan teknologi
          Artificial Intelligent
        </p>
        <div className="font-bold text-nblue4 mb-6">
          <Link className="hover:text-nblue3" to="/register">
            Daftar
          </Link>
          <span className="font-normal text-nblack4"> atau </span>
          <Link className="hover:text-nblue3" to="/login">
            Masuk
          </Link>
        </div>
      </header>

      {/* cards */}
      <div className="flex justify-center items-center space-x-4 mb-4">
        <div className="text-nblack4 flex flex-col items-center bg-[#ffffff] rounded-lg shadow-sm px-6 py-4 max-w-[30ch]">
          <div className="p-4 rounded-full bg-gradient-to-br from-nblue1 to-nblue4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8 text-[#ffffff]"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="font-bold mb-2">Riwayat</p>
          <p className="text-sm text-center text-nblack1">
            Kamu dapat melihat riwayat rekaman untuk mengukur perkembangan
          </p>
        </div>

        <div className="text-nblack4 flex flex-col items-center bg-[#ffffff] rounded-lg shadow-sm px-6 py-4 max-w-[30ch]">
          <div className="p-4 rounded-full bg-gradient-to-br from-nblue1 to-nblue4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8 text-[#ffffff]"
            >
              <path d="M16.5 7.5h-9v9h9v-9Z" />
              <path
                fillRule="evenodd"
                d="M8.25 2.25A.75.75 0 0 1 9 3v.75h2.25V3a.75.75 0 0 1 1.5 0v.75H15V3a.75.75 0 0 1 1.5 0v.75h.75a3 3 0 0 1 3 3v.75H21A.75.75 0 0 1 21 9h-.75v2.25H21a.75.75 0 0 1 0 1.5h-.75V15H21a.75.75 0 0 1 0 1.5h-.75v.75a3 3 0 0 1-3 3h-.75V21a.75.75 0 0 1-1.5 0v-.75h-2.25V21a.75.75 0 0 1-1.5 0v-.75H9V21a.75.75 0 0 1-1.5 0v-.75h-.75a3 3 0 0 1-3-3v-.75H3A.75.75 0 0 1 3 15h.75v-2.25H3a.75.75 0 0 1 0-1.5h.75V9H3a.75.75 0 0 1 0-1.5h.75v-.75a3 3 0 0 1 3-3h.75V3a.75.75 0 0 1 .75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h10.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V6.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="font-bold mb-2">
            <i>Artificial Intelligent</i>
          </p>
          <p className="text-sm text-center text-nblack1">
            Aplikasi menggunakan model AI untuk memberikan penilaian yang sesuai
          </p>
        </div>

        <div className="text-nblack4 flex flex-col items-center bg-[#ffffff] rounded-lg shadow-sm px-6 py-4 max-w-[30ch]">
          <div className="p-4 rounded-full bg-gradient-to-br from-nblue1 to-nblue4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8 text-[#ffffff]"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a.75.75 0 0 1 .75.75V4.5a.75.75 0 0 1-1.5 0V2.25A.75.75 0 0 1 12 1.5ZM5.636 4.136a.75.75 0 0 1 1.06 0l1.592 1.591a.75.75 0 0 1-1.061 1.06l-1.591-1.59a.75.75 0 0 1 0-1.061Zm12.728 0a.75.75 0 0 1 0 1.06l-1.591 1.592a.75.75 0 0 1-1.06-1.061l1.59-1.591a.75.75 0 0 1 1.061 0Zm-6.816 4.496a.75.75 0 0 1 .82.311l5.228 7.917a.75.75 0 0 1-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 0 1-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 0 1-1.247-.606l.569-9.47a.75.75 0 0 1 .554-.68ZM3 10.5a.75.75 0 0 1 .75-.75H6a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 10.5Zm14.25 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H18a.75.75 0 0 1-.75-.75Zm-8.962 3.712a.75.75 0 0 1 0 1.061l-1.591 1.591a.75.75 0 1 1-1.061-1.06l1.591-1.592a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="font-bold mb-2">Mudah Digunakan</p>
          <p className="text-sm text-center text-nblack1">
            Tampilan yang sederhana membuat aplikasi mudah digunakan
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
