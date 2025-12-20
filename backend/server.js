require('dotenv').config();
const express = require('express');
const cors = require('cors');
const databaseConnection = require('./config/db');
const router = require('./authFeatures/authRouters/authRouters');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors());
app.use('/api/auth', router);

const serverConnection = async () => {
    try {
        await databaseConnection(MONGODB_URI);
        app.listen(PORT, () => {
            console.log(`server is running at http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error('server is failed to start');
        process.exit(1);
    }

}

serverConnection();