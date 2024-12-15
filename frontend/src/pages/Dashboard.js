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
          <div className="flex space-x-1 mb-4 items-center">
            <p className="font-bold text-xl">Assalamualaikum, {firstName}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-nyellow"
            >
              <path d="M10.5 1.875a1.125 1.125 0 0 1 2.25 0v8.219c.517.162 1.02.382 1.5.659V3.375a1.125 1.125 0 0 1 2.25 0v10.937a4.505 4.505 0 0 0-3.25 2.373 8.963 8.963 0 0 1 4-.935A.75.75 0 0 0 18 15v-2.266a3.368 3.368 0 0 1 .988-2.37 1.125 1.125 0 0 1 1.591 1.59 1.118 1.118 0 0 0-.329.79v3.006h-.005a6 6 0 0 1-1.752 4.007l-1.736 1.736a6 6 0 0 1-4.242 1.757H10.5a7.5 7.5 0 0 1-7.5-7.5V6.375a1.125 1.125 0 0 1 2.25 0v5.519c.46-.452.965-.832 1.5-1.141V3.375a1.125 1.125 0 0 1 2.25 0v6.526c.495-.1.997-.151 1.5-.151V1.875Z" />
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

      <div className="flex flex-col bg-gradient-to-b from-nblue1/30 to-nblue1/70 p-6 rounded-lg min-w-[75ch] mb-4">
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

      <div className="flex flex-col bg-gradient-to-b from-npurple/30 to-npurple/70 p-6 rounded-lg w-[75ch] mb-20">
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
