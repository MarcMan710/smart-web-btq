// Importing the 'Hafalan' model from the '../models/Hafalan' file
const Hafalan = require('../models/Hafalan');

// Controller function to get all 'Hafalan' entries
exports.getAllHafalan = async (req, res) => {
    try {
        // Retrieve all 'Hafalan' entries from the database and sort them by 'levelRequired'
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
        // Find a specific 'Hafalan' entry by its ID
        const hafalan = await Hafalan.findById(req.params.id);
        
        // Check if the 'Hafalan' entry exists
        if (!hafalan) {
            return res.status(404).json({ message: 'Hafalan not found' });
        }
        
        // Check if the user's level meets the required level for accessing the 'Hafalan'
        if (req.user.level < hafalan.levelRequired) {
            return res.status(403).json({ message: 'Access denied: Insufficient level' });
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
        // Check if the 'Hafalan' entry exists by its ID for updating
        let hafalan = await Hafalan.findById(req.params.id);

        if (hafalan) {
            // Update the existing 'Hafalan' entry with new data
            hafalan.title = title;
            hafalan.content = content;
            hafalan.levelRequired = levelRequired;
            hafalan = await hafalan.save();
            return res.json(hafalan);
        }

        // Create a new 'Hafalan' entry if it does not exist
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
        // Find and delete a specific 'Hafalan' entry by its ID
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