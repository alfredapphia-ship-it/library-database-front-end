//welcome page
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f6fa" }}>
      {/* Hero Section */}
      <div style={{ 
        backgroundColor: "#2c3e50", 
        color: "white", 
        padding: "60px 40px",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "3rem", margin: "0 0 20px 0" }}>📚 Library Management System</h1>
        <p style={{ fontSize: "1.3rem", margin: "0", opacity: 0.9 }}>
          Discover books, manage borrowing, and access library resources easily.
        </p>
      </div>

      {/* Features Section */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 40px" }}>
        <h2 style={{ fontSize: "2rem", textAlign: "center", color: "#2c3e50", marginBottom: "40px" }}>
          ✨ Key Features
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
          <FeatureCard 
            icon="👤"
            title="User Management"
            description="Register and log in as a library user with personalized profiles"
          />
          <FeatureCard 
            icon="📖"
            title="Book Catalog"
            description="Browse a comprehensive collection of books and resources"
          />
          <FeatureCard 
            icon="🔄"
            title="Borrowing System"
            description="Track borrowed books and manage your library loans"
          />
          <FeatureCard 
            icon="⏰"
            title="Due Date Tracking"
            description="Never miss a due date with automatic reminders"
          />
          <FeatureCard 
            icon="💰"
            title="Fine Management"
            description="View and manage overdue penalties and fines"
          />
          <FeatureCard 
            icon="⚙️"
            title="Admin Dashboard"
            description="Powerful tools to manage books, users, and library operations"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ 
        backgroundColor: "#3498db", 
        color: "white", 
        padding: "60px 40px",
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "30px" }}>Ready to Get Started?</h2>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link 
            to="/books"
            style={{
              display: "inline-block",
              padding: "12px 30px",
              backgroundColor: "white",
              color: "#3498db",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "1.05rem",
              transition: "transform 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            Explore Books
          </Link>
          <Link 
            to="/login"
            style={{
              display: "inline-block",
              padding: "12px 30px",
              backgroundColor: "transparent",
              color: "white",
              border: "2px solid white",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "1.05rem",
              transition: "transform 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div style={{
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-8px)";
      e.currentTarget.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.2)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    }}
    >
      <div style={{ fontSize: "3rem", marginBottom: "15px" }}>{icon}</div>
      <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>{title}</h3>
      <p style={{ color: "#7f8c8d", lineHeight: "1.6", margin: "0" }}>{description}</p>
    </div>
  );
};

export default Home;