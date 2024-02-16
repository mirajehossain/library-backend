const slugify = require('slugify');
const BookModel = require('./book.model');

module.exports = {
    createBook: async (payload) => {
        try {
            payload.slug = slugify(payload.title.toLowerCase().trim());

            const isBookExist = await BookModel.findOne({ slug: payload.slug });
            if (isBookExist) {
                const error = new Error('Book is already exists');
                error.statusCode = 409;
                throw error;
            }

            const book = await BookModel.create(payload);
            console.log(`Book created ${book.slug}`);
            return book;
        } catch (e) {
            throw e;
        }
    },

    getBooks: async (skip = 0, limit = 20, search = null) => {
        try {
            const querySpec = {};
            if (search) {
                querySpec['$text'] = { $search: search, $caseSensitive: false };
            }
            const books = await BookModel.find(querySpec)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
            console.log(`${limit} books returned.`);
            return books;
        } catch (e) {
            throw e;
        }
    },

    getBook: async (bookId) => {
        try {
            const book = await BookModel.findOne({ _id: bookId });
            if (!book) {
                const error = new Error('Book not found');
                error.statusCode = 400;
                throw error;
            }
            return book;
        } catch (e) {
            if (e.name === 'CastError') {
                e.message = 'Invalid bookId';
            }
            throw e;
        }
    },

    updateBook: async (bookId, payload) => {
        try {
            const book = await BookModel.findOne({ _id: bookId });
            if (!book) {
                const error = new Error('Book not found');
                error.statusCode = 400;
                throw error;
            }
            const updatedBook = await BookModel.findOneAndUpdate({ _id: book._id }, payload, {
                new: true,
            });
            return updatedBook;
        } catch (e) {
            if (e.name === 'CastError') {
                e.message = 'Invalid bookId';
            }
            throw e;
        }
    },

    deleteBook: async (bookId) => {
        try {
            const book = await BookModel.findOne({ _id: bookId });

            if (!book) {
                const error = new Error('Book not found');
                error.statusCode = 400;
                throw error;
            }
            return await BookModel.deleteOne({ _id: book._id });
        } catch (e) {
            if (e.name === 'CastError') {
                e.message = 'Invalid bookId';
            }
            throw e;
        }
    },
};
