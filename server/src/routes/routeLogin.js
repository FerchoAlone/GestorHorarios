import { Router } from "express";
import { verifyCredentials} from "../services/serviceLogin.js";
const routerLogin = Router();


/**
 * Encargado del inicio de sesion recibiendo por request body el usuario y la contraseña
 * @return {<object>} Objeto con estado de la peticion, un mensaje y el token en caso 
 * de que se haya creado exitosamente
 */
routerLogin.post('/login', async (req, res) => {
    const {user,password} = req.body;
    const credentials={user: user, password: password};
    const response = await verifyCredentials(credentials)
    res.send(response);
});

/*routerLogin.post('/vefToken', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const response = await verifyToken(token);
    res.send(response);
});*/



export default routerLogin;