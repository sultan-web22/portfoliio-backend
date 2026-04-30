const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const aboutSchema = new mongoose.Schema({
    skills: { 
        type: [String], 
        default: [] 
    },
    education: [{
        degree: { type: String, required: true },
        institution: { type: String, required: true },
        year: { type: String, required: true }
    }]
}, { timestamps: true });

const About = mongoose.model('About', aboutSchema);
router.post('/', async (req, res) => {
    try {
        const { skills, education } = req.body;
        const newAbout = await About.create({ skills, education });
        res.status(201).json(newAbout);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const aboutData = await About.findOne(); 
        res.status(200).json(aboutData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { skills, education } = req.body;
        const updatedAbout = await About.findByIdAndUpdate(
            req.params.id,
            { skills, education },
            { new: true, runValidators: true }
        );
        
        if (!updatedAbout) return res.status(404).json({ message: "Not found" });
        
        res.status(200).json(updatedAbout);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await About.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "About section deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;