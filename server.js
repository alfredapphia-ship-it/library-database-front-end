const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(express.json());

const SECRET_KEY = 'test-secret-key-change-in-production';

// Mock database
const users = [
  { _id: '1', email: 'test@example.com', password: 'password123', name: 'Test User', studentId: '12345', department: 'CS' }
];

const books = [
  { _id: '1', title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', available: true, borrowCount: 3 },
  { _id: '2', title: 'Introduction to Algorithms', author: 'CLRS', isbn: '978-0262033848', available: true, borrowCount: 5 },
  { _id: '3', title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', isbn: '978-0201616224', available: false, borrowCount: 2 },
  { _id: '4', title: 'Design Patterns', author: 'Gang of Four', isbn: '978-0201633610', available: true, borrowCount: 4 },
  { _id: '5', title: 'Refactoring', author: 'Martin Fowler', isbn: '978-0201485677', available: true, borrowCount: 1 },
  { _id: '6', title: 'The C Programming Language', author: 'Kernighan & Ritchie', isbn: '978-0131103627', available: false, borrowCount: 6 },
  { _id: '7', title: 'Code Complete', author: 'Steve McConnell', isbn: '978-0735619678', available: true, borrowCount: 2 },
  { _id: '8', title: 'JavaScript - The Good Parts', author: 'Douglas Crockford', isbn: '978-0596517748', available: true, borrowCount: 3 }
];

const borrowedBooks = [];

// Helper: find user by email
const findUserByEmail = (email) => users.find(u => u.email === email);

// Helper: find user by token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
};

// Middleware: verify JWT token
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  
  const token = authHeader.replace('Bearer ', '');
  const decoded = verifyToken(token);
  if (!decoded) return res.status(401).json({ message: 'Invalid token' });
  
  req.user = decoded;
  next();
};

// ===== Authentication Endpoints =====

// Register
app.post('/members/register/student', (req, res) => {
  const { name, email, password, studentId, department, phoneNo, address } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  if (findUserByEmail(email)) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  
  const newUser = {
    _id: String(users.length + 1),
    email,
    password,
    name,
    studentId,
    department,
    phoneNo,
    address
  };
  
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully', user: { ...newUser, password: undefined } });
});

// Login
app.post('/members/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  
  const user = findUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  
  const token = jwt.sign({ _id: user._id, email: user.email, name: user.name }, SECRET_KEY, { expiresIn: '7d' });
  
  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: { _id: user._id, email: user.email, name: user.name, studentId: user.studentId, department: user.department }
  });
});

// Get current user
app.get('/members/me', authMiddleware, (req, res) => {
  try {
    const user = users.find(u => u._id === req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json({
      success: true,
      user: { _id: user._id, email: user.email, name: user.name, studentId: user.studentId, department: user.department }
    });
  } catch (err) {
    console.error('Error in /members/me:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ===== Book Endpoints =====

// Get all books
app.get('/books', (req, res) => {
  res.json({ success: true, books });
});

// Get single book
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b._id === req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json({ success: true, book });
});

// Borrow book
app.put('/books/:id/borrow', authMiddleware, (req, res) => {
  try {
    const bookId = req.params.id;
    const book = books.find(b => b._id === bookId);
    
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (!book.available) return res.status(400).json({ message: 'Book is not available' });
    
    book.available = false;
    const borrowRecord = {
      _id: String(borrowedBooks.length + 1),
      userId: req.user._id,
      bookId: book._id,
      title: book.title,
      author: book.author,
      borrowDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    borrowedBooks.push(borrowRecord);
    
    res.json({ success: true, message: 'Book borrowed successfully', book, borrowed: borrowRecord });
  } catch (err) {
    console.error('Error in /books/:id/borrow:', err);
    res.status(500).json({ message: 'Server error while borrowing book' });
  }
});

// Return book
app.put('/books/:id/return', authMiddleware, (req, res) => {
  try {
    const bookId = req.params.id;
    const book = books.find(b => b._id === bookId);
    
    if (!book) return res.status(404).json({ message: 'Book not found' });
    
    book.available = true;
    const idx = borrowedBooks.findIndex(bb => bb.userId === req.user._id && bb.bookId === book._id);
    if (idx !== -1) borrowedBooks.splice(idx, 1);
    
    res.json({ success: true, message: 'Book returned successfully', book });
  } catch (err) {
    console.error('Error in /books/:id/return:', err);
    res.status(500).json({ message: 'Server error while returning book' });
  }
});

// Borrowed books endpoints
app.get('/borrowed', authMiddleware, (req, res) => {
  try {
    const userBorrowed = borrowedBooks.filter(bb => bb.userId === req.user._id);
    res.json({ success: true, borrowed: userBorrowed });
  } catch (err) {
    console.error('Error in GET /borrowed:', err);
    res.status(500).json({ message: 'Server error fetching borrowed books' });
  }
});

app.get('/borrowed/:id', authMiddleware, (req, res) => {
  try {
    const record = borrowedBooks.find(bb => bb._id === req.params.id);
    if (!record) return res.status(404).json({ message: 'Borrow record not found' });
    res.json({ success: true, borrowed: record });
  } catch (err) {
    console.error('Error in GET /borrowed/:id:', err);
    res.status(500).json({ message: 'Server error fetching borrowed book details' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Mock backend server running on http://localhost:${PORT}`);
});
