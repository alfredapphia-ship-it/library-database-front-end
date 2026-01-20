//simple login form
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        alert(`Welcome back! (${formData.email})`);
        setFormData({ email: "", password: "" });
        setIsLoading(false);
        navigate("/home");
      }, 1000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      backgroundColor: "#f5f6fa"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "30px", textAlign: "center" }}>
          🔐 Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              color: "#2c3e50",
              fontWeight: "500"
            }}>
              Email
            </label>
            <input 
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: errors.email ? "2px solid #e74c3c" : "2px solid #bdc3c7",
                borderRadius: "4px",
                fontSize: "1rem",
                boxSizing: "border-box",
                fontFamily: "inherit"
              }}
            />
            {errors.email && (
              <p style={{ color: "#e74c3c", fontSize: "0.85rem", marginTop: "5px", margin: "5px 0 0 0" }}>
                {errors.email}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              color: "#2c3e50",
              fontWeight: "500"
            }}>
              Password
            </label>
            <input 
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: errors.password ? "2px solid #e74c3c" : "2px solid #bdc3c7",
                borderRadius: "4px",
                fontSize: "1rem",
                boxSizing: "border-box",
                fontFamily: "inherit"
              }}
            />
            {errors.password && (
              <p style={{ color: "#e74c3c", fontSize: "0.85rem", marginTop: "5px", margin: "5px 0 0 0" }}>
                {errors.password}
              </p>
            )}
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: isLoading ? "#95a5a6" : "#3498db",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease"
            }}
            onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = "#2980b9")}
            onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = "#3498db")}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#7f8c8d" }}>
          Don't have an account? <a href="/register" style={{ color: "#3498db", textDecoration: "none", fontWeight: "bold" }}>Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;