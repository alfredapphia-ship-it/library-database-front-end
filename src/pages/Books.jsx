//show list of books
import React, { useState } from "react";
import BookItem from "../components/BookItem";
import { books as initialBooks } from "../data/books";

function Books() {
  const [books, setBooks] = useState(initialBooks);
  const [searchTerm, setSearchTerm] = useState("");

  const handleBorrow = (bookId) => {
    alert(`Book borrowed successfully! (ID: ${bookId})`);
    // Update book availability
    setBooks(books.map(book => 
      book.id === bookId ? { ...book, available: false, borrowCount: book.borrowCount + 1 } : book
    ));
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>📖 Book Catalog</h2>
      
      <div style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "1rem",
            border: "2px solid #3498db",
            borderRadius: "4px",
            boxSizing: "border-box"
          }}
        />
      </div>

      <p style={{ color: "#666", marginBottom: "20px" }}>
        Found {filteredBooks.length} book(s)
      </p>

      {filteredBooks.length === 0 ? (
        <p style={{ color: "#e74c3c", fontSize: "1.1rem" }}>
          No books found matching your search.
        </p>
      ) : (
        filteredBooks.map(book => (
          <BookItem key={book.id} book={book} onBorrow={handleBorrow} />
        ))
      )}
    </div>
  );
}

export default Books;