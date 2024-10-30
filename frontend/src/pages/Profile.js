import React, { useState, useEffect, useContext } from "react";
import api from "../axiosConfig";
import AuthContext from "../context/AuthContext";
import Button from "../components/Button";
import { toast } from "react-toastify";

const Profile = () => {
  const { authState } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get("/api/users/profile", {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });
        // console.log(res.data);
        setUserData(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchUserData();
  }, [authState.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/api/users/profile", userData, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });
      // alert('Profile updated successfully');
      toast.success("Profil berhasil diubah");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center text-nblack4">
      <h1 className="font-bold text-4xl mb-4">Profil</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className="flex items-center justify-between space-x-2 mb-2">
            <label htmlFor="firstName">Nama Depan:</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={userData.firstName}
              onChange={handleChange}
              className="px-2 py-1 rounded-md w-[24ch]"
            />
          </div>
          <div className="flex items-center justify-between space-x-2 mb-4">
            <label htmlFor="lastName">Nama Belakang:</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={userData.lastName}
              onChange={handleChange}
              className="px-2 py-1 rounded-md w-[24ch]"
            />
          </div>
          <div className="self-center">
            <Button type="submit">Ubah</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
