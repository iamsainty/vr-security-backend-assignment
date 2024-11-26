require('dotenv').config();

const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/vr-backend-assignment';

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connection successful");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectToMongo;