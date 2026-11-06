# Lab 3: REST API, Query Parameters, Validation and Debugging

## Project Description

This project is a Books REST API developed using Node.js, Express.js and SQLite.

The API allows users to create, view, update and delete books. It also supports searching, sorting, price filtering, pagination and input validation.

## Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- Thunder Client

## Project Structure

```text
lab-03/
├── database.js
├── init.sql
├── server.js
├── package.json
├── package-lock.json
├── books.db
└── README.md
```

## Installation and Setup

1. Install the required packages:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the API in your browser:

```text
http://localhost:3000/
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books/` | Get all books |
| GET | `/books/:id/` | Get a book by ID |
| POST | `/books/` | Add a new book |
| PUT | `/books/:id/` | Update a book |
| DELETE | `/books/:id/` | Delete a book |

## Query Parameters

The GET `/books/` endpoint supports:

- `search_q` – Search books by partial title.
- `order_by` – Sort by ID, title, author, price or pages.
- `order` – Sort in ASC or DESC order.
- `limit` – Set the number of books to display.
- `offset` – Skip a specified number of books.
- `min_price` – Filter books by minimum price.
- `max_price` – Filter books by maximum price.

### Example Requests

Search:

```text
GET /books/?search_q=Atomic
```

Sort by price:

```text
GET /books/?order_by=price&order=ASC
```

Filter by price:

```text
GET /books/?min_price=250&max_price=350
```

Pagination:

```text
GET /books/?limit=2&offset=2
```

## Input Validation and Status Codes

The API validates book details before inserting or updating records.

| Status Code | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Book created successfully |
| 400 | Invalid or missing input |
| 404 | Book not found |
| 500 | Internal server error |

The project uses parameterized SQL queries to protect against SQL injection.

## Testing

The API was tested using Thunder Client.

Test cases include:

1. Get all books.
2. Get a book by ID.
3. Create a new book.
4. Update an existing book.
5. Delete a book.
6. Search books by title.
7. Sort books by price.
8. Filter books by price range.
9. Test pagination using limit and offset.
10. Test missing title and invalid price.
11. Test a book ID that does not exist.

## Conclusion

This project helped me understand REST API development, HTTP methods, query parameters, SQLite database operations, input validation, status codes and API testing.