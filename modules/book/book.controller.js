const bookService = require('./book.service');
const { bookSchema, updateBookSchema } = require('./book.validation');

module.exports = {
    createBook: async (req, res) => {
        try {
            await bookSchema.validateAsync(req.body);

            const book = await bookService.createBook(req.body);
            return res.status(201).send({
                success: true,
                message: 'Book is created successfully',
                data: book
            });
        } catch (e) {
            return res.status(e.code || 500).send({
                success: false,
                message: e.message,
                error: e,
            });
        }
    },

    getBooks: async (req, res) => {
        try {

            let { page = 1, limit = 20, search = '' } = req.query;
            if (limit > 50) {
                limit = 50;
            }
            const skip = Number(limit) * (Number(page) - 1);

            const books = await bookService.getBooks(skip, limit, search);

            return res.status(200).send({
                success: true,
                message: 'Books fetched successfully',
                data: books,
            });
        } catch (e) {
            return res.status(e.code || 500).send({
                success: false,
                message: e.message,
                error: e,
            });
        }
    },

    getBook: async (req, res) => {
        try {
            const { bookId } = req.params;
            const book = await bookService.getBook(bookId);

            return res.status(200).send({
                success: true,
                message: 'Book fetched successfully',
                data: book
            });
        } catch (e) {
            return res.status(e.code || 500).send({
                success: false,
                message: e.message,
                error: e,
            });
        }
    },

    updateBook: async (req, res) => {
        try {
            const { bookId } = req.params;
            await updateBookSchema.validateAsync(req.body);
            const updatedBook = await bookService.updateBook(bookId, req.body);

            return res.status(200).send({
                success: true,
                message: 'Book updated successfully',
                data: updatedBook
            });
        } catch (e) {
            return res.status(e.code || 500).send({
                success: false,
                message: e.message,
                error: e,
            });

        }
    },

    deleteBook: async (req, res) => {
        try {
            const { bookId } = req.params;
            await bookService.deleteBook(bookId);
            return res.status(200).send({
                success: true,
                message: 'Book deleted successfully',
            });
        } catch (e) {
            return res.status(e.code || 500).send({
                success: false,
                message: e.message,
                error: e,
            });
        }
    }
}