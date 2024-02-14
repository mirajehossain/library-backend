const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        console.log({ mongoURI });
        return await mongoose.connect(mongoURI);
    } catch (err) {
        console.log(`Error while connecting DB `, err);
    }
};

module.exports = { connectDB };