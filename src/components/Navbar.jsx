import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           // clears user from context & localStorage
    navigate("/login"); // redirect after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          📚 LibraryHub
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/books" className="nav-link">Books</Link>
          </li>
          <li className="nav-item">
            <Link to="/borrowed" className="nav-link">Borrowed</Link>
          </li>
          <li className="nav-item">
            <Link to="/newbook" className="nav-link">Add Book</Link>
          </li>
        </ul>
        

                <div className="nav-auth">
                  {!user ? (
                    <>
                      <Link to="/login" className="nav-link">Login</Link>
                      <Link to="/register" className="nav-link-btn">Register</Link>
                    </>
                  ) : (
                    <>
                      <span className="user-name">{user.name}</span>
                      <button onClick={handleLogout} className="nav-link-btn">Logout</button>
                    </>
                  )}
                </div>
              </div>
            </nav>
          );
        };
        
        export default Navbar;