import express from 'express';
import { Book } from './../models/bookModel.js';

const router = express.Router();

// create a new book
router.post('/', async (req, res) => {
    try {
        // validate required fields
        if (!(req.body.title && req.body.author && req.body.publishYear)) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }

        // create a new book
        const newBook = req.body;

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// get all books from database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
});

// get a single book
router.get('/:id', async (req, res) => {
    try {

        const { id: bookId } = req.params;
        const book = await Book.findById(bookId);

        return res.status(200).json(book);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
});

// update a single book
router.put('/:id', async (req, res) => {
    try {
        // validate required fields
        if (!(req.body.title && req.body.author && req.body.publishYear)) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }

        const { id: bookId } = req.params;

        const result = await Book.findByIdAndUpdate(bookId, req.body);

        if (!result) {
            return res.status(404).send({ message: 'Book not found' });
        }

        return res.status(200).send({ message: 'Book updated successfully' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
});

// delete a book
router.delete('/:id', async (req, res) => {
    try {
        const { id: bookId } = req.params;

        const result = await Book.findByIdAndDelete(bookId);

        if (!result) {
            return res.status(404).send({ message: 'Book not found' });
        }

        return res.status(200).send({ message: 'Book deleted successfully' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
});

export default router;