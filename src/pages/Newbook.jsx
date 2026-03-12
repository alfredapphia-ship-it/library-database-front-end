import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function NewBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !isbn) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/books", {
        title,
        author,
        isbn,
        quantity,
        available: quantity > 0,
      });

      toast.success("Book created successfully!");
      // Clear form
      setTitle("");
      setAuthor("");
      setIsbn("");
      setQuantity(1);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create book");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px" }}>➕ Add New Book</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: "10px", fontSize: "1rem" }}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          style={{ padding: "10px", fontSize: "1rem" }}
        />
        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
          style={{ padding: "10px", fontSize: "1rem" }}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          style={{ padding: "10px", fontSize: "1rem" }}
        />
        <button type="submit" style={{ padding: "12px", fontSize: "1rem", background: "#3498db", color: "#fff", border: "none", borderRadius: "5px" }}>
          Create Book
        </button>
      </form>
    </div>
  );
}

export default NewBook;