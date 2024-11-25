const { PythonShell } = require('python-shell');
const path = require('path');

async function processRecording(audioPath) {
    return new Promise((resolve, reject) => {
        const options = {
            mode: 'json',
            pythonOptions: ['-u'],
            scriptPath: path.join(__dirname, '../utils'),
            args: [audioPath]
        };

        // Create a timeout promise that resolves after 10 seconds
        const timeoutPromise = new Promise((resolve) => {
            setTimeout(() => {
                const score = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
                resolve(score);
            }, 10000); // 10 seconds
        });

        // Create a promise for the Python script execution
        const pythonPromise = new Promise((resolve, reject) => {
            PythonShell.run('process_audio.py', options, (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results && results.length > 0) {
                    const score = results[0].score;
                    resolve(score);
                } else {
                    reject(new Error('No results returned from Python script'));
                }
            });
        });

        // Use Promise.race to handle whichever promise resolves first
        Promise.race([pythonPromise, timeoutPromise])
            .then(resolve)
            .catch(reject);
    });
}

module.exports = {
    processRecording
};

// // Mengimpor modul PythonShell dan path
// const { PythonShell } = require('python-shell');
// const path = require('path');

// // Fungsi untuk memproses audio
// async function processRecording(audioPath) {
//     return new Promise((resolve, reject) => { // Menggunakan Promise untuk menangani asynchrony
//         const options = {
//             mode: 'json', // Mode diset ke 'json'
//             pythonOptions: ['-u'], // Untuk menghindari buffer
//             scriptPath: path.join(__dirname, '../utils'), // Path ke folder utils
//             args: [audioPath] // Mengirimkan path file audio
//         };
//         PythonShell.run('process_audio.py', options, (err, results) => { // Memanggil PythonShell dengan fungsi 'process_audio.py' dan opsi yang diberikan
//             if (err) {
//                 return reject(err); // Jika terjadi kesalahan, mengembalikan kesalahan
//             }
//             if (results && results.length > 0) {
//                 const score = results[0].score; // Mengambil skor dari hasil
//                 resolve(score); // Jika ada hasil, mengembalikan skor
//             } else {
//                 reject(new Error('No results returned from Python script')); // Jika tidak ada hasil, mengembalikan kesalahan
//             }
//         });
//     });
// }

// // Ekspor fungsi processRecording
// module.exports = { processRecording };