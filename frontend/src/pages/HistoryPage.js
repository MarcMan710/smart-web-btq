import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const HistoryPage = () => {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/recordings/",
          {
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem("token") || sessionStorage.getItem("token")
              }`,
            },
          }
        );
        // Ensure the response contains the expected data structure
        if (response.data && Array.isArray(response.data)) {
          setRecordings(response.data);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching recordings:", error);
      }
    };

    fetchRecordings();
  }, []);

  return (
    <div className="flex flex-col items-center text-nblack4">
      <h1 className="text-4xl font-bold mb-4">Riwayat</h1>

      <div className="bg-nwhite2 w-[75ch] px-6 py-4 rounded-lg mb-20">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b-[1px] border-nblack1/30">
              <th className="px-4 py-2">Hafalan</th>
              <th className="px-4 py-2">Nilai</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Waktu</th>
              <th className="px-4 py-2">Audio</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(recordings) &&
              recordings.map((recording) => (
                <tr
                  key={recording._id}
                  className="odd:bg-nwhite2 even:bg-nwhite3"
                >
                  <td className="px-4 py-2">Surah Al-Fatihah</td>
                  <td className="px-4 py-2">{recording.score}</td>
                  <td className="px-4 py-2">
                    {recording.passed ? "Lulus" : "Tidak Lulus"}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(recording.recordedAt).toLocaleString("id-ID", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 cursor-pointer"
                      onClick={() => toast.warning("Fitur dalam pengembangan")}
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;
