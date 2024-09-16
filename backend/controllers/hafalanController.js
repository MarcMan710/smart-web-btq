const Hafalan = require('../models/Hafalan');

exports.getAllHafalan = async (req, res) => {
    try {
        const hafalan = await Hafalan.find().sort({ levelRequired: 1 });
        res.json(hafalan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getHafalanDetails = async (req, res) => {
    try {
        const hafalan = await Hafalan.findById(req.params.id);
        if (!hafalan) {
            return res.status(404).json({ message: 'Hafalan not found' });
        }
        if (req.user.level < hafalan.levelRequired) {
            return res.status(403).json({ message: 'Access denied: Insufficient level' });
        }
        res.json(hafalan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.createOrUpdateHafalan = async (req, res) => {
    const { title, content, levelRequired } = req.body;

    try {
        let hafalan = await Hafalan.findById(req.params.id);

        if (hafalan) {
            // Update
            hafalan.title = title;
            hafalan.content = content;
            hafalan.levelRequired = levelRequired;
            hafalan = await hafalan.save();
            return res.json(hafalan);
        }

        // Create
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