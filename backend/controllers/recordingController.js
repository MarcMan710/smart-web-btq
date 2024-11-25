// Mengimpor modul yang diperlukan
const Recording = require('../models/Recording');
const { processRecording } = require('../utils/aiUtils');
const multer = require('multer');

// Configure storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where files should be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Fungsi untuk mendapatkan daftar riwayat rekaman pengguna
const getUserRecordings = async (req, res) => {
    const userId = req.user.id;
    try {
        // Mengambil riwayat rekaman pengguna dari database
        const recordings = await Recording.find({ userId: userId }).select('score passed recordedAt'); 
        res.status(200).json(recordings);
    } catch (err) {
        console.error('Error fetching user recordings:', err); // Pesan error jika terjadi kesalahan dalam pengambilan riwayat rekaman
        res.status(500).json({ message: 'Error fetching recordings' });
    }
};

// Fungsi untuk mengirimkan rekaman dan memprosesnya
const submitRecording = async (req, res) => {
    const userId = req.user.id;
    const audioFile = req.file;

    if (!audioFile) {
        return res.status(400).json({ message: 'No audio file uploaded' }); // Pesan error jika file audio tidak diunggah
    }
    try {
        // Membuat objek rekaman baru
        const recording = new Recording({ 
            userId: userId,
            audioUrl: audioFile.path,
            status: 'pending_approval'
        });
        await recording.save(); // Menyimpan rekaman ke database
        try {
            // Memanggil fungsi processRecording untuk memproses rekaman
            const score = await processRecording(audioFile.path);
            recording.score = score;
            recording.passed = score >= 70; // Menemukan pass/fail status berdasarkan skor
            await recording.save(); // Menyimpan rekaman yang telah diproses
            res.status(201).json({ message: 'Recording submitted and processed, awaiting approval', recording });
        } catch (aiError) {
            console.error('AI processing failed:', aiError);
            // Pesan error jika terjadi kesalahan dalam pemrosesan AI
            handleError(res, aiError);
        }
    } catch (err) {
        console.error('Error during recording submission:', err);
        // Pesan error jika terjadi kesalahan selama pengiriman rekaman
        handleError(res, err);
    }
};
// Eksport modul
module.exports = {
    storage,
    getUserRecordings,
    submitRecording
};

// exports.submitRecording = async (req, res) => {
//     const userId = req.user.id;
//     const audioFile = req.file;

//     if (!audioFile) {
//         return res.status(400).json({ message: 'No audio file uploaded' });
//     }

//     try {
//         const recording = new Recording({
//             userId: userId,
//             audioUrl: audioFile.path, // Store the file path, not the file itself
//             status: 'pending_approval'
//         });

//         await recording.save();

//         try {
//             // Call the processRecording function to get the score
//             const score = await processRecording(audioFile.path);
//             recording.score = score;
//             recording.passed = score >= 70; // Determine pass/fail status based on score
//             await recording.save();
//             res.status(201).json({ message: 'Recording submitted and processed, awaiting approval', recording });
//         } catch (aiError) {
//             console.error('AI processing failed:', aiError);

//             // Fallback logic
//             const score = Math.floor(Math.random() * (100 - 50 + 1)) + 50;;

//             // Determine pass/fail status
//             const passed = score >= 70;

//             // Update the recording with fallback scores and pass/fail status
//             recording.score = score;
//             recording.passed = passed;
//             await recording.save();

//             res.status(201).json({ message: 'Recording submitted with fallback score, awaiting approval', recording });
//         }
//     } catch (err) {
//         console.error('Error during recording submission:', err);
//         // Fallback logic
//         const score = initialScore - wer;

//         const recording = new Recording({
//             userId: userId,
//             audioUrl: audioFile.path,
//             score: score,
//             passed: score >= 70,
//             status: 'pending_approval'
//         });

//         await recording.save();
//         res.status(500).json({ message: 'Recording submitted with fallback score due to an error', recording });
//     }
// };