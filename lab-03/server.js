
const express = require('express');
const { initializeDB } = require('./database');

const app = express();
app.use(express.json());

let db;

// Home route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Lab 3 Books REST API',
        endpoint: 'GET /books/'
    });
});

// GET all books with search, sorting and filters
app.get('/books/', async (req, res) => {
    try {
        const {
            search_q = '',
            order_by = 'id',
            order = 'ASC',
            limit = '10',
            offset = '0',
            min_price,
            max_price
        } = req.query;

        const allowedColumns = ['id', 'title', 'author', 'price', 'pages'];

        const sortColumn = allowedColumns.includes(order_by)
            ? order_by
            : 'id';

        const sortOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

        const pageLimit = Math.max(1, Math.min(100, Number(limit) || 10));
        const pageOffset = Math.max(0, Number(offset) || 0);

        let sql = 'SELECT * FROM book WHERE 1=1';
        const params = [];

        if (search_q) {
            sql += ' AND title LIKE ?';
            params.push(`%${search_q}%`);
        }

        if (min_price !== undefined && min_price !== '') {
            if (!Number.isFinite(Number(min_price))) {
                return res.status(400).json({
                    message: 'min_price must be a number'
                });
            }

            sql += ' AND price >= ?';
            params.push(Number(min_price));
        }

        if (max_price !== undefined && max_price !== '') {
            if (!Number.isFinite(Number(max_price))) {
                return res.status(400).json({
                    message: 'max_price must be a number'
                });
            }

            sql += ' AND price <= ?';
            params.push(Number(max_price));
        }

        sql += ` ORDER BY ${sortColumn} ${sortOrder} LIMIT ? OFFSET ?`;
        params.push(pageLimit, pageOffset);

        const books = await db.all(sql, params);

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve books'
        });
    }
});

// GET a single book by ID
app.get('/books/:id/', async (req, res) => {
    try {
        const { id } = req.params;

        const book = await db.get(
            'SELECT * FROM book WHERE id = ?',
            [id]
        );

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve book'
        });
    }
});

// POST a new book
app.post('/books/', async (req, res) => {
    try {
        const { title, author, price, pages } = req.body;

        if (!title || !author || price === undefined ||
            price === null || price === '' ||
            !Number.isFinite(Number(price))) {
            return res.status(400).json({
                message: 'Title, author and a valid numeric price are required'
            });
        }

        const result = await db.run(
            'INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?)',
            [title, author, Number(price), pages || null]
        );

        res.status(201).json({
            message: 'Book created successfully',
            bookId: result.lastID
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create book'
        });
    }
});

// PUT update a book
app.put('/books/:id/', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, price, pages } = req.body;

        if (!title || !author || price === undefined ||
            price === null || price === '' ||
            !Number.isFinite(Number(price))) {
            return res.status(400).json({
                message: 'Title, author and a valid numeric price are required'
            });
        }

        const existingBook = await db.get(
            'SELECT * FROM book WHERE id = ?',
            [id]
        );

        if (!existingBook) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        await db.run(
            'UPDATE book SET title = ?, author = ?, price = ?, pages = ? WHERE id = ?',
            [title, author, Number(price), pages || null, id]
        );

        res.status(200).json({
            message: 'Book updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update book'
        });
    }
});

// DELETE a book
app.delete('/books/:id/', async (req, res) => {
    try {
        const { id } = req.params;

        const existingBook = await db.get(
            'SELECT * FROM book WHERE id = ?',
            [id]
        );

        if (!existingBook) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        await db.run(
            'DELETE FROM book WHERE id = ?',
            [id]
        );

        res.status(200).json({
            message: 'Book deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete book'
        });
    }
});

// Start server after database initialization
const startServer = async () => {
    try {
        db = await initializeDB();

        app.listen(3000, () => {
            console.log('Server running at http://localhost:3000');
        });
    } catch (error) {
        console.error('Database initialization failed:', error);
    }
};

startServer();
