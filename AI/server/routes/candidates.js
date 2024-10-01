const express = require('express');
const multer = require('multer');
const { analyzeCV } = require('../ai_model');
const { Candidate } = require('../models/Candidate');
const { sendTestLink } = require('../utils/email');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('cv'), async (req, res) => {
    const { name, linkedin, technologies, expertise, experience, phone, email } = req.body;
    const cvPath = req.file.path;

    try {
        const analysis = await analyzeCV(cvPath);
        const isLegit = analysis.technologies.includes(technologies) && analysis.experience >= experience;

        const candidate = new Candidate({
            name,
            linkedin,
            technologies,
            expertise,
            experience,
            phone,
            email,
            cvPath,
            isLegit
        });

        await candidate.save();

        if (isLegit) {
            const testLink = `https://yourapp.com/test?candidateId=${candidate._id}`;
            await sendTestLink(email, testLink);
        }

        res.status(200).send('Candidate data saved successfully');
    } catch (error) {
        console.error('Error processing candidate data', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (error) {
        console.error('Error fetching candidates', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;