const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../../app');

let bookId;

afterAll(async () => {
    await mongoose.connection.close();
    server.close();
});

describe('POST /api/v1.0.0/books', () => {
    let bookTitle;
    it('should create a new book record', async () => {
        function randomNumber(min, max) {
            return Math.random() * (max - min) + min;
        }

        const payload = {
            author: 'Miraje',
            title: `System design fundamental ${randomNumber(1, 1000)}`,
            publication: 'MR PUB',
            publicationYear: '2018',
            category: 'Tech',
        };
        bookTitle = payload.title;

        const res = await request(app).post('/api/v1.0.0/books').send(payload);

        bookId = res.body.data._id;
        expect(res.status).toBe(201);
    });

    it('should return 409 error while creating a new book that already exists', async () => {
        const payload = {
            author: 'Miraje',
            title: bookTitle,
            publication: 'MR PUB',
            publicationYear: '2018',
            category: 'Tech',
        };

        const res = await request(app).post('/api/v1.0.0/books').send(payload);

        expect(res.status).toBe(409);
    });
});

describe('GET /api/v1.0.0/books', () => {
    it('should return a list of books with pagination', async () => {
        const res = await request(app).get('/api/v1.0.0/books').query({ page: 1, limit: 10 });

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBeGreaterThanOrEqual(0);
    });
});

describe('GET /api/v1.0.0/books/:id', () => {
    it('should return a book', async () => {
        const res = await request(app).patch(`/api/v1.0.0/books/${bookId}`);

        expect(res.status).toEqual(200);
        expect(res.body.data).toHaveProperty('_id', bookId);
    });

    it('should return 400 if book is not exists', async () => {
        const bookId = '65cfdcc17521b4bb533fd03f';

        const res = await request(app).patch(`/api/v1.0.0/books/${bookId}`);
        expect(res.status).toEqual(400);
    });

    it('should return 500 if book id is incorrect', async () => {
        const bookId = '65cfdcc17521bxxxxxxxxxxxxd0xf';

        const res = await request(app).patch(`/api/v1.0.0/books/${bookId}`);
        expect(res.status).toEqual(500);
    });
});

describe('PATCH /api/v1.0.0/books/:id', () => {
    it('should update a book', async () => {
        const updatedBookData = {
            author: 'Miraje H',
            summary: 'system design handbook [updated]',
        };

        const res = await request(app).patch(`/api/v1.0.0/books/${bookId}`).send(updatedBookData);

        expect(res.status).toEqual(200);
        expect(res.body.data).toHaveProperty('_id', bookId);
    });

    it('should return 400 if wrong bookId is given while updating a book', async () => {
        const bookId = '65cfdcc17521b4bb533fd03f';

        const updatedBookData = {
            author: 'Miraje H',
            summary: 'system design handbook [updated]',
        };

        const res = await request(app).patch(`/api/v1.0.0/books/${bookId}`).send(updatedBookData);

        expect(res.status).toEqual(400);
    });
});

describe('DELETE /api/v1.0.0/books/:id', () => {
    it('should delete a book', async () => {
        const res = await request(app).delete(`/api/v1.0.0/books/${bookId}`);
        expect(res.status).toEqual(200);
    });

    it('should return 400 if wrong bookId is given for deleting a book', async () => {
        const bookId = '65cfdcc17521b4bb533fd03f';
        const res = await request(app).delete(`/api/v1.0.0/books/${bookId}`);

        expect(res.status).toEqual(400);
    });
});
