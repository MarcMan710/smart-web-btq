// Impor modul yang diperlukan
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function processRecording(audioPath) {
    try {
        const formData = new FormData(); // Membuat objek FormData
        formData.append('audio', fs.createReadStream(audioPath)); // Menambahkan file audio
        console.log('Received audio file:', audioPath);
        console.log('Processing audio...');
        const response = await axios.post('http://localhost:4000/api/process', formData, {
            headers: formData.getHeaders(), // Mengambil headers dari objek FormData
        });
        console.log('Data received:', response.data);
        const score = response.data.score; // Mendapatkan nilai skor
        return score;
    } catch (error) {
        throw new Error(`Error processing audio: ${error.message}`); // Mengembalikan pesan kesalahan
    }
}

module.exports = { processRecording };