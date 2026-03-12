import React, { createContext, useState, useEffect } from "react";
import api, { setAuthToken } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      // validate token with backend and fetch current user
      api.get('/members/me')
        .then(res => {
          setUser(res.data.user || JSON.parse(localStorage.getItem('user')));
        })
        .catch(() => {
          // invalid token, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setAuthToken(null);
          setUser(null);
        });
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setAuthToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, api }}>
      {children}
    </AuthContext.Provider>
  );
};