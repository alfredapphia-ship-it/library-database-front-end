// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Update input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Frontend validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  // Single handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.post("/members/login", formData);
      login(res.data.user, res.data.token); // store user in Auth Context
      toast.success("Login successful!");
      navigate("/"); // redirect to home
    } catch (err) {
      console.error("Login error", err);
      // network errors won't have response
      if (err.response) {
        toast.error(err.response.data?.message || "Login failed");
      } else if (err.request) {
        toast.error("Unable to reach server. Please check your connection or backend.");
      } else {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f5f6fa" }}>
      <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", width: "100%", maxWidth: "400px" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "30px", textAlign: "center" }}>🔐 Login</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#2c3e50", fontWeight: "500" }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "10px",
                border: errors.email ? "2px solid #e74c3c" : "2px solid #bdc3c7",
                borderRadius: "4px",
                fontSize: "1rem",
                fontFamily: "inherit",
              }}
            />
            {errors.email && <p style={{ color: "#e74c3c", fontSize: "0.85rem", marginTop: "5px" }}>{errors.email}</p>}
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#2c3e50", fontWeight: "500" }}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "10px",
                border: errors.password ? "2px solid #e74c3c" : "2px solid #bdc3c7",
                borderRadius: "4px",
                fontSize: "1rem",
                fontFamily: "inherit",
              }}
            />
            {errors.password && <p style={{ color: "#e74c3c", fontSize: "0.85rem", marginTop: "5px" }}>{errors.password}</p>}
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
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = "#2980b9")}
            onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = "#3498db")}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#7f8c8d" }}>
          Don't have an account? <Link to="/register" style={{ color: "#3498db", textDecoration: "none", fontWeight: "bold" }}>Register here</Link>
        </p>
      </div>
    </div>
  );
}