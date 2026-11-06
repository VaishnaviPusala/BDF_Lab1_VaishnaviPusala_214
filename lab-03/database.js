
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'books.db');
const sqlPath = path.join(__dirname, 'init.sql');

let db;

const initializeDB = async () => {
    db = await sqlite.open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    const table = await db.get(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='book'"
    );

    if (!table) {
        const sql = fs.readFileSync(sqlPath, 'utf8');
        await db.exec(sql);
        console.log('Database and books table created successfully');
    } else {
        console.log('Database already exists');
    }

    return db;
};

module.exports = { initializeDB };
