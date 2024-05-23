import React, { createContext} from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const URLrequest = "http://localhost:3001/login";

  const login = async (username, password) => {
    const response = await axios.post(URLrequest, {
      user: username,
      password: password,
    });
    if (response.data.state !== "SUCCESS") {
      return {status:false,rol:null, token:null,message:response.data.message};
    }
    
    localStorage.setItem("token",response.data.token);
    localStorage.setItem("id",response.data.teacherId);
    localStorage.setItem("rol",response.data.rol);
    return {status:true,rol:response.data.rol, token:response.data.token,message:response.data.message};
  };

  const getAccessToken = () => {
    return localStorage.getItem("token");
  };

  const getPermiso = () => {
    return localStorage.getItem("permiso");
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('rol');
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{login, logout, getAccessToken, getPermiso }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
