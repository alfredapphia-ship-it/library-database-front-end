# API Integration Guide

This document outlines the structure for integrating with a backend API. Currently, all data is mocked in `src/data/books.js`.

## Data Models

### Book Object
```javascript
{
  id: number,
  title: string,
  author: string,
  isbn: string,
  available: boolean,
  borrowCount: number,
  // Optional fields for future use:
  // description: string,
  // publishedYear: number,
  // category: string,
  // coverImage: string
}
```

### BorrowedBook Object
```javascript
{
  id: number,
  title: string,
  author: string,
  dueDate: string (YYYY-MM-DD format),
  borrowDate: string (YYYY-MM-DD format),
  // Optional fields:
  // bookId: number,
  // userId: number,
  // fine: number
}
```

### User Object
```javascript
{
  id: number,
  username: string,
  email: string,
  name: string,
  // Optional fields:
  // phone: string,
  // address: string,
  // joinDate: string
}
```

## Backend Endpoints Needed

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user profile

### Books
- `GET /api/books` - Get all books (with pagination/filtering)
- `GET /api/books/:id` - Get single book details
- `GET /api/books/search?q=title` - Search books
- `POST /api/books/:id/borrow` - Borrow a book
- `POST /api/books/:id/return` - Return a book

### Borrowed Books
- `GET /api/borrowed` - Get user's borrowed books
- `GET /api/borrowed/:id` - Get borrowed book details
- `DELETE /api/borrowed/:id` - Return a book

## Integration Steps

1. **Replace Mocked Data in Components:**
   - Update `Books.jsx` to fetch from `GET /api/books`
   - Update `Borrowed.jsx` to fetch from `GET /api/borrowed`

2. **Add Authentication Context:**
   - Create `AuthContext.js` for global auth state
   - Replace Navbar's local state with context

3. **Add API Service:**
   - Create `src/services/api.js` for all API calls
   - Add error handling and loading states

4. **Update Form Submissions:**
   - Login form → `POST /api/auth/login`
   - Register form → `POST /api/auth/register`

## Example Integration Pattern

```javascript
// In Books.jsx
import { useEffect, useState } from 'react';
import { getBooks } from '../services/api';

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    // ... render books
  );
}
```

## Mocked Data Conversion

To convert from mocked to real API:

1. Remove: `import { books } from '../data/books'`
2. Replace with: API fetch calls in `useEffect`
3. Handle loading and error states
4. Update component state management

## Current Mock Data Location

All mock data is in: `src/data/books.js`

Export functions like:
```javascript
export const books = [...]
export const borrowedBooks = [...]
export const users = [...]
```

These can be replaced with API calls using a service like Axios or Fetch API.
