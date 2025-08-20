import React, { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("nomado-token") || null);
  const [isLogin, setIsLogin] = useState(token ? true: false);
  const [allListings, setAllListings] = useState([])

  useEffect(() => {
    // setIsLogin(token ? true : false);
    console.log(token)
  }, [token]);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, token, setToken,allListings,setAllListings }}>
      {children}
    </AuthContext.Provider>
  );
};
