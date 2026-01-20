//shows borrowed books
import React, { useState } from "react";
import { borrowedBooks as initialBorrowedBooks } from "../data/books";

const Borrowed = () => {
  const [borrowedBooks, setBorrowedBooks] = useState(initialBorrowedBooks);

  const handleReturn = (bookId) => {
    alert(`Book returned successfully! (ID: ${bookId})`);
    setBorrowedBooks(borrowedBooks.filter(book => book.id !== bookId));
  };

  const getOverdueStatus = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const daysOverdue = Math.floor((today - due) / (1000 * 60 * 60 * 24));
    
    if (daysOverdue > 0) {
      return { isOverdue: true, days: daysOverdue };
    }
    return { isOverdue: false, days: Math.ceil((due - today) / (1000 * 60 * 60 * 24)) };
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>📚 Borrowed Books</h2>

      <p style={{ marginTop: "10px", color: "#666" }}>
        Below is a list of books you have currently borrowed.
      </p>

      <hr style={{ margin: "20px 0", borderColor: "#ddd" }} />

      {borrowedBooks.length === 0 ? (
        <p style={{ fontSize: "1.1rem", color: "#7f8c8d", textAlign: "center", padding: "30px" }}>
          ✓ You have not borrowed any books yet.
        </p>
      ) : (
        borrowedBooks.map((book) => {
          const overdueInfo = getOverdueStatus(book.dueDate);
          return (
            <div
              key={book.id}
              style={{
                border: `2px solid ${overdueInfo.isOverdue ? "#e74c3c" : "#27ae60"}`,
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "8px",
                backgroundColor: overdueInfo.isOverdue ? "#fadbd8" : "#eafaf1",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div>
                  <h4 style={{ margin: "0 0 10px 0", color: "#2c3e50" }}>{book.title}</h4>
                  <p style={{ margin: "5px 0", color: "#555" }}>
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p style={{ margin: "5px 0", color: "#555" }}>
                    <strong>Borrow Date:</strong> {new Date(book.borrowDate).toLocaleDateString()}
                  </p>
                  <p style={{ margin: "5px 0", color: "#555" }}>
                    <strong>Due Date:</strong> {new Date(book.dueDate).toLocaleDateString()}
                  </p>
                  <p style={{ 
                    margin: "10px 0 0 0", 
                    color: overdueInfo.isOverdue ? "#e74c3c" : "#27ae60",
                    fontWeight: "bold"
                  }}>
                    {overdueInfo.isOverdue 
                      ? `⚠️ OVERDUE by ${overdueInfo.days} day(s)` 
                      : `✓ ${overdueInfo.days} day(s) remaining`}
                  </p>
                </div>
                <button 
                  onClick={() => handleReturn(book.id)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#3498db",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background-color 0.3s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#2980b9"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#3498db"}
                >
                  Return Book
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Borrowed;