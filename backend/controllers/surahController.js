// Importing the 'Surah' model from the '../models/Surah' file
const Surah = require('../models/Surah');

// Controller function to get all 'Surah' entries
exports.getAllSurah = async (req, res) => {
    try {
        const surah = await Surah.find().sort({ levelRequired: 1 });
        res.json(surah);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Controller function to get details of a specific 'Surah' entry
exports.getSurahDetails = async (req, res) => {
    try {
        const surah = await Surah.findById(req.params.id);
        
        if (!surah) {
            return res.status(404).json({ message: 'Surah not found' });
        }
        
        res.json(surah);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Controller function to create or update a 'Surah' entry
exports.createOrUpdateSurah = async (req, res) => {
    const { title, content, levelRequired } = req.body;

    try {
        let surah = await Surah.findById(req.params.id);

        if (surah) {
            surah.title = title;
            surah.content = content;
            surah.levelRequired = levelRequired;
            surah = await surah.save();
            return res.json(surah);
        }

        surah = new Surah({
            title,
            content,
            levelRequired,
        });

        await surah.save();
        res.status(201).json(surah);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Controller function to delete a 'Surah' entry
exports.deleteSurah = async (req, res) => {
    try {
        const surah = await Surah.findById(req.params.id);
        if (!surah) {
            return res.status(404).json({ message: 'Surah not found' });
        }
        await surah.remove();
        res.json({ message: 'Surah removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
