import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children, navigate }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem("authToken", userData.token);
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
