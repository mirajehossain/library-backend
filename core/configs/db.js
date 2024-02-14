const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        let mongoServer = await mongoose.connect(mongoURI);


        if (process.env.NODE_ENV === 'test') {
            const mongoUri = mongoServer.getUri();
            process.env.TEST_MONGO_URI = mongoUri;
            mongoServer = await MongoMemoryServer.create();
        }
        return mongoServer;
    } catch (err) {
        console.log(`Error while connecting DB `, err);
    }
};

module.exports = { connectDB };