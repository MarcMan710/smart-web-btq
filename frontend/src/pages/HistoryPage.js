import React, { useEffect, useState } from "react";
import axios from "axios";

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

      <div className="bg-nwhite2 w-[60ch] px-6 py-4 rounded-lg mb-4">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b-[1px] border-nblack1/30">
              <th className="px-4 py-2">Hafalan</th>
              <th className="px-4 py-2">Nilai</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Waktu</th>
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;
