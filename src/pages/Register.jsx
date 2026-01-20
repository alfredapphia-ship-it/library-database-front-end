//simple registration form
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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
    
    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
        alert(`Account created successfully! (${formData.email})`);
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setIsLoading(false);
        navigate("/login");
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
          📝 Register
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              color: "#2c3e50",
              fontWeight: "500"
            }}>
              Full Name
            </label>
            <input 
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: errors.name ? "2px solid #e74c3c" : "2px solid #bdc3c7",
                borderRadius: "4px",
                fontSize: "1rem",
                boxSizing: "border-box",
                fontFamily: "inherit"
              }}
            />
            {errors.name && (
              <p style={{ color: "#e74c3c", fontSize: "0.85rem", marginTop: "5px", margin: "5px 0 0 0" }}>
                {errors.name}
              </p>
            )}
          </div>

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

          <div style={{ marginBottom: "20px" }}>
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
              placeholder="Enter a password"
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

          <div style={{ marginBottom: "30px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              color: "#2c3e50",
              fontWeight: "500"
            }}>
              Confirm Password
            </label>
            <input 
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: errors.confirmPassword ? "2px solid #e74c3c" : "2px solid #bdc3c7",
                borderRadius: "4px",
                fontSize: "1rem",
                boxSizing: "border-box",
                fontFamily: "inherit"
              }}
            />
            {errors.confirmPassword && (
              <p style={{ color: "#e74c3c", fontSize: "0.85rem", marginTop: "5px", margin: "5px 0 0 0" }}>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: isLoading ? "#95a5a6" : "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease"
            }}
            onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = "#229954")}
            onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = "#27ae60")}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#7f8c8d" }}>
          Already have an account? <a href="/login" style={{ color: "#3498db", textDecoration: "none", fontWeight: "bold" }}>Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;