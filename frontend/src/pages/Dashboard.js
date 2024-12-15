import React, { useEffect, useState, useContext } from "react";
import api from "../axiosConfig";
import AuthContext from "../context/AuthContext";
import HafalanCard from "../components/HafalanCard";
import HafalanModal from "../components/HafalanModal";
import { useNavigate } from "react-router-dom";
import potrait from "../assets/man.png";
import thumb1 from "../assets/thumbnail1.png";
import thumb2 from "../assets/thumbnail2.jpeg";

const Dashboard = () => {
  const [selectedHafalan, setSelectedHafalan] = useState(null);
  const { authState } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get("/api/users/profile", {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });
        setFirstName(res.data.firstName);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchUserData();
  }, [authState.token]);

  const hafalanList = [
    {
      _id: "1",
      title: "Surah Al-Fatihah",
      description: "Surah Al-Fatihah adalah Surah pertama dalam Kitab Al-Quran",
    },
  ];

  const handleCardClick = (hafalan) => {
    setSelectedHafalan(hafalan);
  };

  const handleCloseModal = () => {
    setSelectedHafalan(null);
  };

  const renderHafalanCards = () => (
    <div className="flex flex-col space-y-4">
      {hafalanList.map((hafalan) => (
        <HafalanCard
          key={hafalan._id}
          hafalan={hafalan}
          onClick={() => handleCardClick(hafalan)}
        />
      ))}
    </div>
  );

  const renderModal = () =>
    selectedHafalan && (
      <HafalanModal hafalan={selectedHafalan} onClose={handleCloseModal} />
    );

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const monthName = monthNames[month];
  const year = date.getFullYear();

  return (
    <div className="flex flex-col items-center text-nblack4">
      <div className="mb-4 flex justify-between p-6 rounded-lg bg-gradient-to-r from-nblue4 to-nblue3 min-w-[75ch]">
        <div className="text-nwhite1 flex flex-col">
          <p className="text-sm">
            {day} {monthName}, {year}
          </p>
          <div className="flex space-x-1 mb-4">
            <p className="font-bold text-xl">Assalamualaikum, {firstName}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"
              />
            </svg>
          </div>
          <p className="text-sm mb-1">Tugas kamu</p>
          <div className="text-nblack1 text-sm flex space-x-2">
            <div className="w-[8rem] flex items-center space-x-1 p-2 rounded-lg bg-nwhite1 font-bold">
              <div className="px-[.4rem] rounded-full border-solid border-2 border-nblack1">
                1
              </div>
              <p>Hafalan</p>
            </div>
            <div className="w-[8rem] flex items-center space-x-1 p-2 rounded-lg bg-nwhite1 font-bold">
              <div className="px-[.4rem] rounded-full border-solid border-2 border-nblack1">
                3
              </div>
              <p>Surah</p>
            </div>
          </div>
        </div>

        <img src={potrait} className="w-[8rem]"></img>
      </div>

      <div className="flex flex-col bg-nblue1/30 p-6 rounded-lg min-w-[75ch] mb-4">
        <p className="font-bold text-nblack4 text-lg mb-4">Tugas</p>
        <div className="flex space-x-4 items-start justify-between">
          <div className="flex flex-1 flex-col p-4 rounded-lg bg-nwhite1">
            <div>
              <p className="text-sm mb-2 font-bold text-nblue4">Hafalan</p>
              {renderHafalanCards()}
            </div>
          </div>

          <div className="flex flex-1 flex-col p-4 rounded-lg bg-nwhite1">
            <p className="text-sm mb-2 font-bold text-nblue4">Bacaan</p>
            <div
              className="items-center flex justify-between space-x-6 bg-gradient-to-r from-norange/30 to-norange/70 rounded-md p-4 w-full cursor-pointer mb-4"
              onClick={() => navigate("/read")}
            >
              <h2 className="text-sm font-bold">Surah Al-Baqarah</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
              </svg>
            </div>

            <div
              className="flex items-center justify-between space-x-6 bg-gradient-to-r from-norange/30 to-norange/70 rounded-md p-4 w-full cursor-pointer mb-4"
              onClick={() => navigate("/read")}
            >
              <h2 className="text-sm font-bold">Surah Al-Mulk</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
              </svg>
            </div>

            <div
              className="flex items-center justify-between space-x-6 bg-gradient-to-r from-norange/30 to-norange/70 rounded-md p-4 w-full cursor-pointer"
              onClick={() => navigate("/read")}
            >
              <h2 className="text-sm font-bold">Surah Yasin</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-npurple/30 p-6 rounded-lg w-[75ch] mb-20">
        <p className="font-bold text-nblack4 text-lg mb-4">Materi</p>

        <div
          className="mb-4 flex flex-1 space-x-2 p-4 rounded-lg bg-nwhite1 cursor-pointer"
          onClick={() => navigate("/comingSoon")}
        >
          <img src={thumb1} className="w-[4rem] object-cover rounded-lg"></img>
          <div className="flex flex-col">
            <p className="text-sm mb-1 font-bold text-nblack4">
              Hukum Bacaan Mad
            </p>
            <p className="text-xs">
              Salah satu hukum bacaan dalam ilmu tajwid yang penting untuk
              dipelajari oleh umat Islam adalah hukum mad. Hukum mad terdiri
              atas 15 macam, di mana masing-masing hukum bacaan memiliki
              karakteristik tersendiri...
            </p>
          </div>
        </div>

        <div
          className="flex flex-1 space-x-2 p-4 rounded-lg bg-nwhite1 cursor-pointer"
          onClick={() => navigate("/comingSoon")}
        >
          <img src={thumb2} className="w-[4rem] object-cover rounded-lg"></img>
          <div className="flex flex-col">
            <p className="text-sm mb-1 font-bold text-nblack4">
              Keutamaan Surah Yasin
            </p>
            <p className="text-xs">
              Al-Qur'an merupakan mukjizat bagi umat Islam yang diturunkan
              melalui perantara Nabi Muhammad SAW. Surat Yasin menjadi inti dari
              Al-Qur'an atau disebut sebagai jantungnya Al-Qur'an...
            </p>
          </div>
        </div>
      </div>
      {renderModal()}
    </div>
  );
};

export default Dashboard;
