const express = require('express');
const cors = require('cors');
const { connectDB } = require('./core/configs/db');

const libraryRoutes = require('./modules/book/book.route')
const app = express();
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    console.log(`MongoDB is connected`);
});

const corsOptions = {
    origin: '*',
    methods: 'GET, PUT, DELETE, OPTIONS, PATCH',
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    return res.send({ success: true, message: 'Digital Library Application' })
})

app.use('/api', libraryRoutes);


app.use((req, res, next) => {
    return res.status(404).send({
        success: false,
        message: 'Url not found'
    });
});

app.use((err, req, res, next) => {
    console.log(`Internal server error ${err.message}`);
    return res.status(500).send({
        success: false,
        message: 'Internal server error',
        error: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});