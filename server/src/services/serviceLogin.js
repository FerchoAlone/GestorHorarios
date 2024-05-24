import pool from "../database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

/**
 * Consulta las credenciales del usuario en la base de datos y devuelve un token si la consulta es exitosa
 * @return {<object>} Objeto con estado de la peticion, un mensaje y el token en caso
 * de que se haya creado exitosamente
 */
export const verifyCredentials = async (credentials) => {
  try {
    const [response] = await pool.query(
      "SELECT * FROM user WHERE USER_LOGIN = ? AND USER_PASSWORD = ?",
      [credentials.user, credentials.password]
    );
    if (!response || !response.length) {
      return {
        state: "ERROR",
        message: "El nombre de usuario o contraseña son incorrectos",
        token: null,
      };
    }
    const user = response[0];
    dotenv.config();
    const token = jwt.sign(
      { userPassword: user.USER_PASSWORD, userLogin: user.USER_LOGIN,rol: user.USER_TYPE, teacherId: user.TEACHER_ID},
      process.env.SECRETWORD,
      { expiresIn: process.env.EXPIRESTOKEN }
    );
    return {
      state: "SUCCESS",
      message: "Inicio de sesión exitoso",
      token: token,
      rol: user.USER_TYPE,
      teacherId: user.TEACHER_ID
    };
  } catch (error) {
    return { state: "ERROR", message: "Error al iniciar sesión", token: null,rol:null,teacherId:null };
  }
};


export const authMiddleware = (req, res, next) => {
  // Obtener el token de los encabezados de la solicitud
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  if (!token) {
    return res.send({state:"TOKEN",message:"No token provided"});
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token,process.env.SECRETWORD); // Usa la clave secreta adecuada
    console.log(decoded);
    //req.user = decoded; // Adjuntar el payload del token al objeto de solicitud
    next(); // Continuar con la siguiente función de middleware o la ruta
  } catch (ex) {
    res.send({state:"TOKEN",message:"No token valid"});
  }
};
