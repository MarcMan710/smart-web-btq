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
        className="bg-gradient-to-l from-norange/80 to-norange/30 shadow-md rounded-md p-6 w-[45ch] cursor-pointer mb-2"
        onClick={() => navigate("/read")}
      >
        <h2 className="font-bold">Surah Al-Baqarah</h2>
      </div>

      <div
        className="bg-gradient-to-l from-norange/80 to-norange/30 shadow-md rounded-md p-6 w-[45ch] cursor-pointer mb-2"
        onClick={() => navigate("/read")}
      >
        <h2 className="font-bold">Surah Al-Mulk</h2>
      </div>

      <div
        className="bg-gradient-to-l from-norange/80 to-norange/30 shadow-md rounded-md p-6 w-[45ch] cursor-pointer mb-20"
        onClick={() => navigate("/read")}
      >
        <h2 className="font-bold">Surah Yasin</h2>
      </div>
    </div>
  );
};

export default Dashboard;
