# 📚 Library Management API

A RESTful API built with **Express**, **TypeScript**, and **Mongoose** to manage books and borrow records in a library system.

---

## 🚀 Features

- Create, Read, Update, Delete (CRUD) operations for books.
- Borrow books with stock validation and business logic.
- Borrowed book summary using aggregation.
- Schema validation using Mongoose.
- Filtering, sorting, and limit support.
- Uses static/instance methods and Mongoose middleware.

---

## 🧪 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- Dotenv

---

## 📦 Installation

```bash
git clone https://github.com/SajmulHossain/level-2-assignment-3.git
cd level-2-assignment-3
npm install
```

Create & Update the `.env` file:

```env
DB_USER = your_database_username
DB_PASS = your_database_password
Or you can totally replace the mongoose.connect uri in src/server.ts file 
```

---

## 🧬 Run the Project

### Development

```bash
npm run dev
```

### Production

```bash
tsc
node server.js
```

---

## 📚 API Endpoints

### ✅ Book Endpoints

#### 1. Create Book

**POST** `/api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

#### 2. Get All Books

**GET** `/api/books`

Supports query params:
- `filter`: Filter by genre
- `sortBy`: Field to sort (e.g., `createdAt`)
- `sort`: `asc` or `desc`
- `limit`: Number of results

Example:

```
/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```

#### 3. Get Book by ID

**GET** `/api/books/:bookId`

#### 4. Update Book

**PUT** `/api/books/:bookId`

```json
{
  "copies": 10
}
```

#### 5. Delete Book

**DELETE** `/api/books/:bookId`

---

### 📦 Borrow Endpoints

#### 6. Borrow a Book

**POST** `/api/borrow`

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

📌 **Business Logic**:
- Checks available copies.
- Deducts quantity and sets `available: false` if needed.
- Saves borrow record.

#### 7. Borrowed Book Summary

**GET** `/api/borrow`

Returns aggregation of total borrowed quantity per book:

```json
[
  {
    "book": {
      "title": "The Theory of Everything",
      "isbn": "9780553380163"
    },
    "totalQuantity": 5
  }
]
```

---

## ⚙️ Models

### 🟦 Book Model

```ts
{
  title: string (required),
  author: string (required),
  genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY" (required),
  isbn: string (required, unique),
  description?: string,
  copies: number (non-negative, required),
  available: boolean (default: true)
}
```

### 🟧 Borrow Model

```ts
{
  book: ObjectId (ref to Book, required),
  quantity: number (positive, required),
  dueDate: Date (required)
}
```

---

## ❌ Error Response Format

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

---

## 🧠 Additional Highlights

- ✅ Mongoose static/instance method to control availability.
- ✅ Pre/Post middleware used in models.
- ✅ Clean controller-service-repository structure.
- ✅ Centralized error handling and validation.
- ✅ Filtering, sorting, and limit supported.

---

<!-- ## 📹 Demo

[📺 Watch Demo Video](https://your-demo-link.com) -->

<!-- --- -->

## 🌐 Live Link

[🔗 Visit API](https://library-management-omega-green.vercel.app)

---

## 📁 Folder Structure

```
📁 src
├── 📁 controllers
├── 📁 models
├── 📁 routes
├── 📁 config
├── app.ts
└── server.ts
```

---

## ✍️ Author

**Sajmul Hossain**
