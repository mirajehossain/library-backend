const { Router } = require('express');
const bookController = require('./book.controller');

const router = Router();

router.post('/v1.0.0/books', bookController.createBook);
router.get('/v1.0.0/books', bookController.getBooks);
router.get('/v1.0.0/books/:bookId', bookController.getBook);
router.patch('/v1.0.0/books/:bookId', bookController.updateBook);
router.delete('/v1.0.0/books/:bookId', bookController.deleteBook);



module.exports = router;