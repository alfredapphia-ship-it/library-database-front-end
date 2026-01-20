// Mocked book data
export const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    available: true,
    borrowCount: 3
  },
  {
    id: 2,
    title: "Introduction to Algorithms",
    author: "Cormen, Leiserson, Rivest, Stein",
    isbn: "978-0262033848",
    available: true,
    borrowCount: 5
  },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    author: "Hunt & Thomas",
    isbn: "978-0201616224",
    available: false,
    borrowCount: 2
  },
  {
    id: 4,
    title: "Design Patterns",
    author: "Gang of Four",
    isbn: "978-0201633610",
    available: true,
    borrowCount: 4
  },
  {
    id: 5,
    title: "Refactoring",
    author: "Martin Fowler",
    isbn: "978-0201485677",
    available: true,
    borrowCount: 1
  },
  {
    id: 6,
    title: "The C Programming Language",
    author: "Kernighan & Ritchie",
    isbn: "978-0131103627",
    available: false,
    borrowCount: 6
  },
  {
    id: 7,
    title: "Code Complete",
    author: "Steve McConnell",
    isbn: "978-0735619678",
    available: true,
    borrowCount: 2
  },
  {
    id: 8,
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    isbn: "978-0596517748",
    available: true,
    borrowCount: 3
  }
];

export const borrowedBooks = [
  {
    id: 1,
    title: "The Pragmatic Programmer",
    author: "Hunt & Thomas",
    dueDate: "2026-01-25",
    borrowDate: "2026-01-11"
  },
  {
    id: 2,
    title: "The C Programming Language",
    author: "Kernighan & Ritchie",
    dueDate: "2026-02-01",
    borrowDate: "2026-01-08"
  }
];

export const users = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    name: "John Doe"
  },
  {
    id: 2,
    username: "jane_smith",
    email: "jane@example.com",
    name: "Jane Smith"
  }
];
