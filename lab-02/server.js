
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database(
    path.join(__dirname, 'books.db'),
    (err) => {
        if (err) {
            console.log('Database connection failed:', err.message);
        } else {
            console.log('Database connected successfully!');
        }
    }
);

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to Books Management API!');
});

// 1. READ - Get all books
app.get('/books', (req, res) => {
    db.all('SELECT * FROM book', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// 2. READ - Get book by ID
app.get('/books/:id', (req, res) => {
    db.get(
        'SELECT * FROM book WHERE id = ?',
        [req.params.id],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!row) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json(row);
        }
    );
});

// 3. CREATE - Add a new book
app.post('/books', (req, res) => {
    const { title, author, price, pages } = req.body;

    db.run(
        'INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?)',
        [title, author, price, pages],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                message: 'Book added successfully!',
                id: this.lastID
            });
        }
    );
});

// 4. UPDATE - Update book details
app.put('/books/:id', (req, res) => {
    const { title, author, price, pages } = req.body;

    db.run(
        'UPDATE book SET title = ?, author = ?, price = ?, pages = ? WHERE id = ?',
        [title, author, price, pages, req.params.id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json({ message: 'Book updated successfully!' });
        }
    );
});

// 5. DELETE - Delete a book
app.delete('/books/:id', (req, res) => {
    db.run(
        'DELETE FROM book WHERE id = ?',
        [req.params.id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json({ message: 'Book deleted successfully!' });
        }
    );
});

// Start server
app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}`);
});
