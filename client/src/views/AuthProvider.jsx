import React, { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const URLrequest = "http://localhost:3001/login";
  const [token, setToken] = useState(null);

  const login = async (username, password) => {
    const respose = await axios.post(URLrequest, {
      user: username,
      password: password,
    });
    if (respose.data.state !== "SUCCESS") {
      return false;
    }
    setToken(respose.data.token);
    alert(respose.data.type)
    return true;
  };

  const logout = () => {
    setToken(null);
    alert("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
