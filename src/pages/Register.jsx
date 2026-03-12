//simple registration form
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    department: "",
    phoneNo: "",
    address: "",
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
    if(!formData.studentId) {
      newErrors.studentId= "StudentId required";
    }
    if(!formData.department) {
      newErrors.department= "Department required";
    
    }
    if(!formData.phoneNo) {
      newErrors.phoneNo= "phone No required";
    }
    if(!formData.address) {
      newErrors.address= "Address required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        await api.post("/members/register/student", formData);
        toast.success("Registration successful!");
        setFormData({ name: "", email: "", studentId: "", department: "", phoneNo: "", address: "", password: "", confirmPassword: "" });
        navigate("/login");
      } catch (error) {
        console.error("Registration error", error);
        if (error.response) {
          toast.error("Registration failed: " + (error.response.data?.message || "Server error"));
        } else if (error.request) {
          toast.error("Unable to reach server. Please check your connection or backend.");
        } else {
          toast.error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
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
              studentId
            </label>
            <input 
              type="text"
              name="studentId"
              placeholder="Enter your student Id"
              value={formData.studentId}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: errors.studentId ? "2px solid #e74c3c" : "2px solid #bdc3c7",
                borderRadius: "4px",
                fontSize: "1rem",
                boxSizing: "border-box",
                fontFamily: "inherit"
              }}
            />
            {errors.studentId && (
              <p style={{ color: "#e74c3c", fontSize: "0.85rem", marginTop: "5px", margin: "5px 0 0 0" }}>
                {errors.studentId}
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
    Department
  </label>
  <select
    name="department"
    value={formData.department}
    onChange={handleChange}
    style={{
      width: "100%",
      padding: "10px",
      border: errors.department ? "2px solid #e74c3c" : "2px solid #bdc3c7",
      borderRadius: "4px",
      fontSize: "1rem",
      boxSizing: "border-box",
    }}
  >
    <option value="">Select your department</option>
    <option value="ETLM">ETLM</option>
    <option value="SOBE">SOBE</option>
    <option value="DEED">DEED</option>
  </select>
  {errors.department && (
    <p style={{ color: "#e74c3c", fontSize: "0.85rem", marginTop: "5px", margin: "5px 0 0 0" }}>
      {errors.department}
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
              Phone No
            </label>
            <input 
              type="text"
              name="phoneNo"
              placeholder="Enter your phone number"
              value={formData.phoneNo}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: errors.phoneNo ? "2px solid #e74c3c" : "2px solid #bdc3c7",
                borderRadius: "4px",
                fontSize: "1rem",
                boxSizing: "border-box",
                fontFamily: "inherit"
              }}
            />
            {errors.phoneNo && (
              <p style={{ color: "#e74c3c", fontSize: "0.85rem", marginTop: "5px", margin: "5px 0 0 0" }}>
                {errors.phoneNo}
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
              Address
            </label>
            <input 
              type="address"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: errors.address ? "2px solid #e74c3c" : "2px solid #bdc3c7",
                borderRadius: "4px",
                fontSize: "1rem",
                boxSizing: "border-box",
                fontFamily: "inherit"
              }}
            />
            {errors.address && (
              <p style={{ color: "#e74c3c", fontSize: "0.85rem", marginTop: "5px", margin: "5px 0 0 0" }}>
                {errors.address}
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

          <div style={{ marginBottom: "30px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              color: "#2c3e50",
              fontWeight: "500"
            }}>
              Confirm password
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
          Already have an account? <Link to="/login" style={{ color: "#3498db", textDecoration: "none", fontWeight: "bold" }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register; 