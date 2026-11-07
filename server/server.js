const express = require('express');
const cors = require('cors');
require('dotenv').config();
console.log('Mongo URI loaded:', !!process.env.MONGO_URI);
const connectDB = require('./config/db.js');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Aaroh Backend is Running!');
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Aaroh server running on port ${PORT}`);
    });
};

startServer();