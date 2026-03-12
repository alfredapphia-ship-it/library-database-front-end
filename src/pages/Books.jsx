import React, { useState, useContext, useEffect } from "react";
import BookItem from "../components/BookItem";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);

  // Fetch books from backend on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((res) => {
        // Some endpoints return data inside `data` key, others return directly
        setBooks(res.data.data || res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle borrowing a book
  const handleBorrow = async (bookId) => {
    if (!user) {
      toast.error("Please log in to borrow books");
      return;
    }

    try {
      const res = await api.put(`/books/${bookId}/borrow`, {
        userId: user._id,
      });

      toast.success(res.data.message || "Book borrowed successfully!");

      // Update frontend state immediately
      setBooks((prevBooks) =>
        prevBooks.map((b) =>
          b._id === bookId ? { ...b, available: false, quantity: b.quantity - 1 } : b
        )
      );
    } catch (err) {
      console.error("Borrow error", err.response || err);
      toast.error(err.response?.data?.message || "Borrowing failed");
    }
  };

  // Filter books by search term
  const filteredBooks = books.filter(
    (book) =>
      (book.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.author || "").toLowerCase().includes(searchTerm.toLowerCase())
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
            boxSizing: "border-box",
          }}
        />
      </div>

      {filteredBooks.length === 0 ? (
        <p style={{ color: "#e74c3c", fontSize: "1.1rem" }}>No books found.</p>
      ) : (
        filteredBooks.map((book) => (
          <BookItem
            key={book._id}
            book={book}
            onBorrow={() => handleBorrow(book._id)}
          />
        ))
      )}
    </div>
  );
}

export default Books;