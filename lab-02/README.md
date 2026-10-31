# Lab 02 – Books Management API

## Objective
To develop a Books Management API using Node.js, Express.js and SQLite with CRUD operations.

## Technologies Used
- Node.js
- Express.js
- SQLite
- JavaScript
- Thunder Client

## Project Structure

- `database.js` – Database connection and initialization.
- `init.sql` – SQL commands to create the table and insert records.
- `server.js` – Express server and CRUD API routes.
- `books.db` – SQLite database.
- `screenshots/` – API testing screenshots.

## Installation

Install the required dependencies:

```bash
npm install
```

## Running the Project

Initialize the database:

```bash
node database.js
```

Start the server:

```bash
node server.js
```

Open:

`http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get a book by ID |
| POST | `/books` | Add a new book |
| PUT | `/books/:id` | Update book details |
| DELETE | `/books/:id` | Delete a book |

## Testing

All five CRUD operations were tested using Thunder Client.

## Conclusion

Successfully developed and tested a Books Management API using Node.js, Express.js and SQLite.