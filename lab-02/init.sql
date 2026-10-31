
CREATE TABLE IF NOT EXISTS book (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price INTEGER,
    pages INTEGER
);

INSERT INTO book (title, author, price, pages) VALUES
('Wings of Fire', 'A.P.J. Abdul Kalam', 250, 180),
('Atomic Habits', 'James Clear', 350, 320),
('The Alchemist', 'Paulo Coelho', 200, 208),
('Rich Dad Poor Dad', 'Robert Kiyosaki', 300, 336),
('Ikigai', 'Hector Garcia', 280, 194),
('Harry Potter', 'J.K. Rowling', 400, 350),
('Think and Grow Rich', 'Napoleon Hill', 220, 250),
('The Power of Now', 'Eckhart Tolle', 320, 236),
('Deep Work', 'Cal Newport', 310, 296),
('The Psychology of Money', 'Morgan Housel', 290, 256);
