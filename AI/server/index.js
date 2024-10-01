const express = require('express');
const mongoose = require('mongoose');
const candidatesRouter = require('./routes/candidates');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use('/api/candidates', candidatesRouter);

// Connect to MongoDB with a different connection string
const mongoConnectionString = 'mongodb://localhost:27018/yourdbname'; // Update this line with your new connection string

mongoose.connect(mongoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});