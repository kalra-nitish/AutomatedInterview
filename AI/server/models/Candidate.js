const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: String,
    linkedin: String,
    technologies: String,
    expertise: String,
    experience: Number,
    phone: String,
    email: String,
    cvPath: String,
    isLegit: Boolean
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = { Candidate };