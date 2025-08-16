import React, { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("nomado-token") || "");
  const [isLogin, setIsLogin] = useState(token ? true : false);

  useEffect(() => {
    setIsLogin(token ? true : false);
  }, [token]);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
