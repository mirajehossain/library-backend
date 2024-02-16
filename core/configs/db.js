const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        let mongoServer;
        let mongoURI;

        if (process.env.NODE_ENV === 'test') {
            mongoServer = await MongoMemoryServer.create();
            mongoURI = mongoServer.getUri();
        } else {
            mongoURI = process.env.MONGO_URI;
        }
        mongoServer = await mongoose.connect(mongoURI);

        return mongoServer;
    } catch (err) {
        console.log(`Error while connecting DB `, err);
        throw err;
    }
};

module.exports = { connectDB };
