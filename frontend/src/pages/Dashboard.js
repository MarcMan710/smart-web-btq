import React, { useEffect, useState, useContext } from "react";
import api from "../axiosConfig";
import AuthContext from "../context/AuthContext";
import HafalanCard from "../components/HafalanCard";
import HafalanModal from "../components/HafalanModal";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="flex flex-col items-center text-nblack4">
      <h1 className="font-bold text-4xl mb-2">Assalamualaikum, {firstName}!</h1>
      <p className="text-sm text-nblack1 mb-4">
        Berikut adalah daftar hafalan yang bisa kamu lakukan
      </p>
      {renderHafalanCards()}
      {renderModal()}

      <p className="text-sm text-nblack1 mt-6 mb-4">
        Berikut adalah daftar surah yang bisa kamu baca
      </p>

      <div
        className="flex justify-between bg-gradient-to-l from-norange/80 to-norange/30 shadow-md rounded-md p-6 w-[45ch] cursor-pointer mb-2"
        onClick={() => navigate("/read")}
      >
        <h2 className="font-bold">Surah Al-Baqarah</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
        </svg>
      </div>

      <div
        className="flex justify-between bg-gradient-to-l from-norange/80 to-norange/30 shadow-md rounded-md p-6 w-[45ch] cursor-pointer mb-2"
        onClick={() => navigate("/read")}
      >
        <h2 className="font-bold">Surah Al-Mulk</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
        </svg>
      </div>

      <div
        className="flex justify-between bg-gradient-to-l from-norange/80 to-norange/30 shadow-md rounded-md p-6 w-[45ch] cursor-pointer mb-20"
        onClick={() => navigate("/read")}
      >
        <h2 className="font-bold">Surah Yasin</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
        </svg>
      </div>
    </div>
  );
};

export default Dashboard;
