// Importing the 'Hafalan' model from the '../models/Hafalan' file
const Hafalan = require('../models/Hafalan');

// Controller function to get all 'Hafalan' entries
exports.getAllHafalan = async (req, res) => {
    try {
        const hafalan = await Hafalan.find().sort({ levelRequired: 1 });
        res.json(hafalan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Controller function to get details of a specific 'Hafalan' entry
exports.getHafalanDetails = async (req, res) => {
    try {
        const hafalan = await Hafalan.findById(req.params.id);
        
        if (!hafalan) {
            return res.status(404).json({ message: 'Hafalan not found' });
        }
        
        res.json(hafalan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Controller function to create or update a 'Hafalan' entry
exports.createOrUpdateHafalan = async (req, res) => {
    const { title, content, levelRequired } = req.body;

    try {
        let hafalan = await Hafalan.findById(req.params.id);

        if (hafalan) {
            hafalan.title = title;
            hafalan.content = content;
            hafalan.levelRequired = levelRequired;
            hafalan = await hafalan.save();
            return res.json(hafalan);
        }

        hafalan = new Hafalan({
            title,
            content,
            levelRequired,
        });

        await hafalan.save();
        res.status(201).json(hafalan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Controller function to delete a 'Hafalan' entry
exports.deleteHafalan = async (req, res) => {
    try {
        const hafalan = await Hafalan.findById(req.params.id);
        if (!hafalan) {
            return res.status(404).json({ message: 'Hafalan not found' });
        }
        await hafalan.remove();
        res.json({ message: 'Hafalan removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Controller function to add a new Hafalan
exports.addHafalan = async (req, res) => {
    const { title, content, levelRequired, description } = req.body;

    try {
        const newHafalan = new Hafalan({
            title,
            content,
            levelRequired,
            description
        });

        const savedHafalan = await newHafalan.save();
        res.status(201).json(savedHafalan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};