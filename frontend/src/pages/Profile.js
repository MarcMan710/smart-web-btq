import React, { useState, useEffect, useContext } from "react";
import api from "../axiosConfig";
import AuthContext from "../context/AuthContext";
import Button from "../components/Button";
import { toast } from "react-toastify";
import potrait from "../assets/man.png";

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

      <div className="relative cursor-pointer">
        <div className="absolute rounded-full w-[8rem] h-[8rem] hover:bg-nblack4/20"></div>
        <img
          src={potrait}
          className="mb-4 w-[8rem] h-[8rem] object-cover rounded-full border-solid border-2 border-nblack4"
        ></img>
        <div className="rounded-full bg-nblue4 absolute bottom-4 right-1 p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 text-nwhite1"
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
          </svg>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-20">
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
          <div className="flex items-center justify-between space-x-2 mb-2">
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
          <div className="flex items-center justify-between space-x-2 mb-2">
            <label htmlFor="lastName">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value="john.doe@example.com"
              className="px-2 py-1 rounded-md w-[24ch]"
              readOnly
            />
          </div>
          <div className="flex items-center justify-between space-x-2 mb-6">
            <label htmlFor="lastName">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              value="password123"
              className="px-2 py-1 rounded-md w-[24ch]"
              readOnly
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
