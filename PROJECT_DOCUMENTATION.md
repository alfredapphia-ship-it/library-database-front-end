# Frontend Library Management System

A modern React-based Library Management System with a responsive design, featuring book browsing, borrowing management, and user authentication.

## 🚀 Features

- **📚 Navigation Bar** - Sticky navigation with logo, menu links, and authentication status
- **🏠 Home Page** - Hero section with feature cards and call-to-action buttons
- **📖 Book Catalog** - Browse and search books with availability status
- **🔄 Borrowed Books** - Track borrowed books with due dates and overdue indicators
- **🔐 User Authentication** - Login and registration pages with form validation
- **🎨 Modern UI** - Clean, responsive design with smooth animations

## 📁 Project Structure

```
src/
├── components/
│   ├── BookItem.jsx          # Individual book card component
│   └── Navbar.jsx            # Navigation bar component
│   └── Navbar.css            # Navbar styling
├── pages/
│   ├── Home.jsx              # Landing page with features
│   ├── Books.jsx             # Book catalog page
│   ├── Borrowed.jsx          # Borrowed books tracking page
│   ├── login.jsx             # Login page
│   └── Register.jsx          # Registration page
├── data/
│   └── books.js              # Mocked data (books, borrowedBooks, users)
├── App.js                    # Main app component with routing
├── App.css                   # Global styles
└── index.js                  # React entry point
```

## 🗂️ Mocked Data Structure

### books.js
Contains three main data exports:

1. **books** - Array of book objects with properties:
   - `id`, `title`, `author`, `isbn`, `available`, `borrowCount`

2. **borrowedBooks** - Array of currently borrowed books with:
   - `id`, `title`, `author`, `dueDate`, `borrowDate`

3. **users** - Array of user objects with:
   - `id`, `username`, `email`, `name`

## 🎨 Components

### Navbar Component
- Logo linking to home
- Navigation links (Home, Books, Borrowed)
- Authentication status with login/register or logout
- Sticky positioning with shadow effect
- Mobile responsive design

### BookItem Component
- Displays book title, author, ISBN, and availability
- Hover effects with smooth transitions
- Disabled borrow button for unavailable books
- Status indicators (✅ Available / ❌ Not Available)

### Pages

#### Home
- Hero section with welcome message
- 6 feature cards with icons and descriptions
- Call-to-action section with buttons
- Responsive grid layout

#### Books
- Search functionality (by title or author)
- Dynamic book listing using mocked data
- Book count display
- Borrow button with availability checking
- Loading of full book details from data

#### Borrowed
- List of currently borrowed books
- Due date tracking with visual indicators
- Overdue detection (⚠️ OVERDUE or ✓ X days remaining)
- Return book functionality
- Color-coded status (red for overdue, green for on-time)

#### Login
- Email and password validation
- Error messages for invalid inputs
- Loading state during submission
- Link to registration page
- Form reset after successful login

#### Register
- Full name, email, password, and confirm password fields
- Comprehensive form validation
- Password matching verification
- Error messages with specific guidance
- Link to login page
- Redirect to login after successful registration

## 🎯 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 🔄 Usage

### Browsing Books
1. Click "Books" in the navigation bar
2. View all available books or search by title/author
3. Click "Borrow" to borrow an available book

### Tracking Borrowed Books
1. Click "Borrowed" in the navigation bar
2. View all your borrowed books with due dates
3. See overdue indicators in red
4. Click "Return Book" to return a book

### Authentication
1. Click "Register" to create a new account
2. Fill in all required fields with validation
3. Click "Login" to access your account
4. After login, the navbar shows "Welcome, [username]" and "Logout" button

## 🎨 Styling

- **Color Scheme:**
  - Primary: #3498db (Blue)
  - Success: #27ae60 (Green)
  - Error: #e74c3c (Red)
  - Dark: #2c3e50 (Dark Blue-Grey)
  - Light: #f5f6fa (Light Grey)

- **Features:**
  - Smooth transitions and hover effects
  - Responsive grid layouts
  - Mobile-first design approach
  - Accessibility-friendly color contrasts

## 📱 Responsive Design

- Mobile-optimized navigation
- Responsive grid for feature cards
- Flexible layouts for all screen sizes
- Touch-friendly button sizes

## 🔮 Future Enhancements

- Backend API integration
- Real user authentication
- Book reservations
- Fine management system
- Admin dashboard
- Book reviews and ratings
- Reading history
- Wishlist functionality

## 📝 Notes

- All data is currently mocked in `src/data/books.js`
- For production, replace mocked data with API calls
- Form submissions are simulated with 1-second delays
- Authentication state is local to the Navbar component
