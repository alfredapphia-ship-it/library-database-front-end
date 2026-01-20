//displays single book
function BookItem({ book, onBorrow }) {
  return (
    <div style={{ 
      border: "1px solid #ddd", 
      borderRadius: "8px",
      margin: "15px 0", 
      padding: "15px",
      backgroundColor: book.available ? "#fff" : "#f8f9fa",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: "transform 0.2s ease"
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
    onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
    >
      <h4 style={{ margin: "0 0 10px 0", color: "#2c3e50" }}>{book.title}</h4>
      <p style={{ margin: "5px 0", color: "#555" }}>
        <strong>Author:</strong> {book.author}
      </p>
      <p style={{ margin: "5px 0", color: "#555" }}>
        <strong>ISBN:</strong> {book.isbn}
      </p>
      <p style={{ margin: "5px 0", color: "#555" }}>
        <strong>Status:</strong> {book.available ? "✅ Available" : "❌ Not Available"}
      </p>
      <button 
        onClick={() => onBorrow(book.id)}
        disabled={!book.available}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          backgroundColor: book.available ? "#3498db" : "#bdc3c7",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: book.available ? "pointer" : "not-allowed",
          fontWeight: "bold",
          transition: "background-color 0.3s ease"
        }}
      >
        {book.available ? "Borrow" : "Unavailable"}
      </button>
    </div>
  );
}

export default BookItem;