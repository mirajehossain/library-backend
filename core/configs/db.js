const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        let mongoServer = await MongoMemoryServer.create();
        let mongoURI = mongoServer.getUri();

        if (process.env.NODE_ENV !== 'test') {
            const mongoURI = process.env.MONGO_URI;
            mongoServer = await mongoose.connect(mongoURI);
        }
        mongoServer = await mongoose.connect(mongoURI);

        return mongoServer;
    } catch (err) {
        console.log(`Error while connecting DB `, err);
    }
};

module.exports = { connectDB };