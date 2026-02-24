# Quick Reference Guide

## 🎯 Navigation & Features

### Navbar
- **Logo:** LibraryHub 📚 (links to home)
- **Menu Items:** Home | Books | Borrowed
- **Auth Section:** Login/Register or Welcome + Logout

### Home Page
- Hero section with system description
- 6 feature cards explaining key features
- Call-to-action buttons (Explore Books, Sign In)

### Books Page
- Search bar (search by title or author)
- Book count display
- List of all 8 books with:
  - Title and author
  - ISBN
  - Availability status
  - Borrow button (disabled if unavailable)

### Borrowed Page
- List of 2 borrowed books
- Each book shows:
  - Title, author
  - Borrow date and due date
  - Overdue status with day count
  - Return button

### Login Page
- Email and password fields
- Form validation
- Error messages
- Link to register

### Register Page
- Full name, email, password, confirm password
- Comprehensive validation
- Error messages with guidance
- Link to login

## 📊 Mocked Data Overview

**Location:** `src/data/books.js`

### Available Books (8)
1. Clean Code - Robert C. Martin - Available ✅
2. Introduction to Algorithms - CLRS - Available ✅
3. The Pragmatic Programmer - Hunt & Thomas - Unavailable ❌
4. Design Patterns - Gang of Four - Available ✅
5. Refactoring - Martin Fowler - Available ✅
6. The C Programming Language - Kernighan & Ritchie - Unavailable ❌
7. Code Complete - Steve McConnell - Available ✅
8. JavaScript: The Good Parts - Douglas Crockford - Available ✅

### Borrowed Books (2)
1. The Pragmatic Programmer - Due: 2026-01-25 (Overdue by 22 days) ⚠️
2. The C Programming Language - Due: 2026-02-01 (15 days remaining) ✓

## 🛠️ Component File Locations

```
src/
├── components/
│   ├── Navbar.jsx           ← Navigation component
│   ├── Navbar.css           ← Navigation styling
│   └── BookItem.jsx         ← Book card component
│
├── pages/
│   ├── Home.jsx             ← Home page
│   ├── Books.jsx            ← Books catalog
│   ├── Borrowed.jsx         ← Borrowed books
│   ├── login.jsx            ← Login form
│   └── Register.jsx         ← Registration form
│
├── data/
│   └── books.js             ← Mocked data
│
├── App.js                   ← Routing setup
└── App.css                  ← Global styles
```

## 🎨 Styling Colors

| Element | Color | Hex |
|---------|-------|-----|
| Navbar | Dark Slate | #2c3e50 |
| Primary Button | Blue | #3498db |
| Success | Green | #27ae60 |
| Error | Red | #e74c3c |
| Background | Light Grey | #f5f6fa |
| Text | Dark | #2c3e50 |
| Subtext | Medium Grey | #555 |

## 🔄 State Management

### Current Implementation
- **Navbar:** Local state (isLoggedIn, userName)
- **Books:** useState for books and searchTerm
- **Borrowed:** useState for borrowedBooks
- **Forms:** useState for formData and errors

### Future: Context API
- Create AuthContext for global auth state
- Replace local Navbar state
- Share user data across components

## 📱 Responsive Design

- **Mobile:**< 768px
- **Desktop:** ≥ 768px

Navbar stacks vertically on mobile, horizontal on desktop.

## 🚀 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject (not recommended)
npm eject
```

## 🔗 Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/home` | Home.jsx | Landing page |
| `/books` | Books.jsx | Book catalog |
| `/borrowed` | Borrowed.jsx | Borrowed books |
| `/login` | login.jsx | User login |
| `/register` | Register.jsx | User registration |

## ⚡ Quick Tips

1. **Search:** Filter books by title or author on Books page
2. **Overdue:** Red background indicates overdue books
3. **Availability:** Greyed out buttons mean book is unavailable
4. **Validation:** Forms show specific error messages
5. **Navigation:** All pages accessible via navbar

## 📝 Form Validation Rules

### Login
- Email: Required, valid email format
- Password: Required

### Register
- Name: Required, min 2 characters
- Email: Required, valid email format
- Password: Required, min 6 characters
- Confirm: Required, must match password

## 💡 Next Steps to API Integration

1. Create `src/services/api.js`
2. Add API fetch functions
3. Update components to use `useEffect` + API calls
4. Add loading and error states
5. Implement AuthContext for global state

---

**App Status:** ✅ Running
**URL:** http://localhost:3000
**Last Updated:** January 16, 2026
