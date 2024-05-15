import pool from "../database.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

/**
 * Consulta las credenciales del usuario en la base de datos y devuelve un token si la consulta es exitosa
 * @return {<object>} Objeto con estado de la peticion, un mensaje y el token en caso 
 * de que se haya creado exitosamente
 */
export const verifyCredentials = async (credentials) => {
    try {
        const [response] = await pool.query("SELECT * FROM user WHERE USER_LOGIN = ? AND USER_PASSWORD = ?", [credentials.user, credentials.password]);
        if (!response || !response.length) {
            return { state: 'INCORRECT', message: "El nombre de usuario o contraseña son incorrectos", token: null };
        }
        const user = response[0];
        dotenv.config();
        const token = jwt.sign({userPassword: user.USER_PASSWORD, userLogin: user.USER_LOGIN },process.env.SECRETWORD, { expiresIn: process.env.EXPIRESTOKEN });
        return { state: 'SUCCESS', message: "Inicio de sesión exitoso", token };
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return { state: 'ERROR', message: "Error al iniciar sesión", token: null };
    }
  };

export const verifyToken=async (token)=>{
    try {
        dotenv.config();
        const response = jwt.verify(token,process.env.SECRETWORD)
        return response;
    } catch (error) {
        if(error.name==="TokenExpiredError")return {state:'ERROR',message:'Tiempo de sesion expirado'};
        if(error.name==="JsonWebTokenError")return {state:'ERROR',message:'Error de autenticacion'};
        return {state:'ERROR',message:'Violacion de seguridad'};
    }
}