import React, { createContext} from "react";
//import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //const URLrequest = "http://localhost:3001/login";

  const login = async (username, password) => {
    /*const respose = await axios.post(URLrequest, {
      user: username,
      password: password,
    });
    if (respose.data.state !== "SUCCESS") {
      return false;
    }
    setToken(respose.data.token);
    alert(respose.data.type)
    return true;*/
    
    const response ={status:true, rol:"COORDINADOR",token:"123456"};
    localStorage.setItem("token",response.token);
    return {status:true,rol:response.rol, token:response.token};
  };

  const getAccessToken = () => {
    return localStorage.getItem("token");
  };

  const getPermiso = () => {
    return localStorage.getItem("permiso");
  };

  const logout = () => {
    localStorage.removeItem('token');
    // Podrías redirigir al usuario después de logout
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
