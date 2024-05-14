import pool from "../database.js";

/**
 * Obtiene todos los ambientes de la base de datos
 * @returns response: Array con objetos que guardan la información  de los ambientes
 */
export const getAllEnvironments = async () => {
  const [response] = await pool.query("SELECT * FROM environment");
  return response;
};

/**
 * Agrega un ambiente a la base de datos
 * @param {id,name,location,capacity,status,type} env Objeto con la información del ambiente
 * @returns {state,message} Retorna un objeto donde se guarda el estado de la operacion (SUCCESS o ERROR) y un mensaje
 */
export const addEnvironment = async (env) => {
  try {
    const response = await pool.query(
      "INSERT INTO environment (ENVIRONMENT_ID, ENVIRONMENT_NAME, ENVIRONMENT_LOCATION, ENVIRONMENT_CAPACITY, ENVIRONMENT_STATUS, ENVIRONMENT_TYPE) VALUES (?, ?, ?, ?, ?, ?)",
      [env.id, env.name, env.location, env.capacity, env.status, env.type]
    );
    return { state: "SUCCESS", message: "Ambiente agregado exitosamente" };
  } catch (e) {
    if (e.errno == 1062) {
      return {
        state: "ERROR",
        message: "Ya existe un ambiente con ese identificador (ID)",
      };
    }
    if (e.errno == 1048) {
      return {
        state: "ERROR",
        message:
          "Informacion incompleta: Por favor, complete todos los campos obligatorios. ",
      };
    }
    return {
      state: "ERROR",
      message:
        "Ha ocurrido un error al agregar el ambiente. Ambiente NO registrado",
    };
  }
};

/**
 * Actualiza la información de un ambiente
 * @param {id,name,location,capacity,status,type} env Objeto con la información del ambiente
 * @returns {state,message} Retorna un objeto donde se guarda el estado de la operacion (SUCCESS o ERROR) y un mensaje
 */
export const updateEnvironment = async (env) => {
  try {
    const response = await pool.query(
      "UPDATE environment SET ENVIRONMENT_ID = ? , ENVIRONMENT_NAME = ?, ENVIRONMENT_LOCATION = ?, ENVIRONMENT_CAPACITY = ?, ENVIRONMENT_STATUS = ?, ENVIRONMENT_TYPE = ? WHERE ENVIRONMENT_ID = ?",
      [
        env.id,
        env.name,
        env.location,
        env.capacity,
        env.status,
        env.type,
        env.id,
      ]
    );
    return { state: "SUCCESS", message: "Ambiente actualizado exitosamente" };
  } catch (e) {
    if (e.errno == 1048) {
      return {
        state: "ERROR",
        message:
          "Informacion incompleta: Por favor, complete todos los campos obligatorios. ",
      };
    }
    return {
      state: "ERROR",
      message:
        "Ha ocurrido un error al actualizar el ambiente. Ambiente NO actualizado",
    };
  }
};

/**
 * Cambia el estado de un ambiente con el idenficador = {id}
 * @param  id Identifcador del ambiente
 * @param  status Nuevo status del ambiente (0 o 1)
 * @returns {state,message} Retorna un objeto donde se guarda el estado de la operacion (SUCCESS o ERROR) y un mensaje
 */
export const changeStateEnvironment = async (id, status) => {
  try {
    const response = await pool.query(
      "UPDATE environment SET ENVIRONMENT_STATUS = ? WHERE ENVIRONMENT_ID = ?",
      [status, id]
    );
    return { state: "SUCCESS", message: "Estado del ambiente actualizado" };
  } catch (e) {
    return {
      state: "ERROR",
      message:
        "Ha ocurrido un error al actualizar el estado del ambiente. Ambiente NO actualizado",
    };
  }
};

/**
 * Obtiene el ambiente con identificador ={id}
 * @param {*} id Id del ambiente a consultar
 * @returns {ENVIRONMENT_ID,ENVIRONMENT_NAME,ENVIRONMENT_LOCATION,ENVIRONMENT_CAPACITY,ENVIRONMENT_STATUS, ENVIRONMENT_TYPE}
 * Informacion del ambiente, ENVIRONMENT_ID=-1 si el ambiente no existe
 */
export const getEnvironmentById = async (id) => {
  const [response] = await pool.query(
    "SELECT * FROM environment WHERE ENVIRONMENT_ID = ?",
    [id]
  );
  if(response[0])return response[0];
  return {ENVIRONMENT_ID:-1};
};

/**
 * Obtiene todos los ambientes con estado activo (ENVIRONMENT_STATUS=0)
 * @returns response: Array con objetos que guardan la información  de los ambientes
 */
export const getAllEnvironmentsActived = async () => {
  const [response] = await pool.query(
    "SELECT * FROM environment WHERE ENVIRONMENT_STATUS = 0"
  );
  return response;
};
