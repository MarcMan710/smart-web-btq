// frontend/src/components/HafalanCard.js
import React from "react";

const HafalanCard = ({ hafalan, onClick }) => {
  return (
    <div
      className="flex justify-between bg-gradient-to-r from-nblue1/30 to-nblue1/80 shadow-md rounded-md p-6 w-[45ch] cursor-pointer"
      onClick={onClick}
    >
      <h2 className="font-bold">{hafalan.title}</h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6"
      >
        <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
        <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
      </svg>
    </div>
  );
};

export default HafalanCard;
