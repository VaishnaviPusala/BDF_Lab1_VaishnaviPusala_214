CREATE TABLE IF NOT EXISTS book (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price REAL NOT NULL,
    pages INTEGER
);

INSERT INTO book (title, author, price, pages)
VALUES
('Atomic Habits', 'James Clear', 450, 320),
('The Alchemist', 'Paulo Coelho', 300, 208),
('Rich Dad Poor Dad', 'Robert Kiyosaki', 350, 336),
('Wings of Fire', 'A.P.J. Abdul Kalam', 250, 180),
('Ikigai', 'Hector Garcia', 400, 200);
