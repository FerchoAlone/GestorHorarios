import { Router } from "express";
import {
  getAllEnvironments,
  addEnvironment,
  updateEnvironment,
  changeStateEnvironment,
  getEnvironmentById,
  getAllEnvironmentsActived,
} from "../services/serviceEnviroment.js";

const routerEnviroment = Router();
const pathBase = "/environment/";

/*TODO IMPLEMENTAR EL VERIFICADOR TOKEN
const vefToken =(token)=>{
    return token;
}*/

/**
 * Obtiene todos los ambientes por medio del servicio de ambientes
 * @returns enviroments: Array con objetos que guardan la información  de los ambientes
 */
routerEnviroment.get(pathBase + "getAll", async (req, res) => {
  const enviroments = await getAllEnvironments();
  res.send(enviroments);
});

/**
 * Agrega un ambiente 
 * @returns {state,message} Retorna un objeto donde se guarda el estado de la operacion (SUCCESS o ERROR) y un mensaje
 */
routerEnviroment.post(pathBase + "addEnvironment", async (req, res) => {
  const { id, name, location, capacity, status, type } = req.body;
  const env = { id, name, location, capacity, status, type };
  const response = await addEnvironment(env);
  res.send(response);
});

/**
 * Actualiza la información de un ambiente
 * @returns {state,message} Retorna un objeto donde se guarda el estado de la operacion (SUCCESS o ERROR) y un mensaje
 */
routerEnviroment.post(pathBase + "updateEnvironment", async (req, res) => {
  const { id, name, location, capacity, status, type } = req.body;
  const env = { id, name, location, capacity, status, type };
  const response = await updateEnvironment(env);
  res.send(response);
});

/**
 * Cambia el estado de un ambiente
 * @returns {state,message} Retorna un objeto donde se guarda el estado de la operacion (SUCCESS o ERROR) y un mensaje
 */
routerEnviroment.post(pathBase + "changeStateEnvironment", async (req, res) => {
  const { id, status } = req.body;
  const response = await changeStateEnvironment(id, status);
  res.send(response);
});

/**
 * Obtiene el ambiente con identificador pasado en el request body
 * @returns {ENVIRONMENT_ID,ENVIRONMENT_NAME,ENVIRONMENT_LOCATION,ENVIRONMENT_CAPACITY,ENVIRONMENT_STATUS, ENVIRONMENT_TYPE}
 * Informacion del ambiente, ENVIRONMENT_ID=-1 si el ambiente no existe
 */
routerEnviroment.get(pathBase + "getEnvironmentById", async (req, res) => {
  const { id } = req.body;
  const enviroments = await getEnvironmentById(id);
  res.send(enviroments);
});

/**
 * Obtiene todos los ambientes con estado activo (ENVIRONMENT_STATUS=0)
 * @returns response: Array con objetos que guardan la información  de los ambientes
 */
routerEnviroment.get(pathBase + "getEnvironmentsActived", async (req, res) => {
  const enviroments = await getAllEnvironmentsActived();
  res.send(enviroments);
});

export default routerEnviroment;
