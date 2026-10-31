
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

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

const sql = fs.readFileSync(
    path.join(__dirname, 'init.sql'),
    'utf8'
);

db.exec(sql, (err) => {
    if (err) {
        console.log('Error creating table:', err.message);
    } else {
        console.log('Books table created and records inserted!');
    }

    db.close();
});
