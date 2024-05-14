import pool from "../database.js";

export const getAllEnvironments = async () => {
  const [response] = await pool.query("SELECT * FROM environment");
  return response;
};

export const addEnvironment = async (env) => {
  try {
    const response = await pool.query(
      "INSERT INTO environment (ENVIRONMENT_ID, ENVIRONMENT_NAME, ENVIRONMENT_LOCATION, ENVIRONMENT_CAPACITY, ENVIRONMENT_STATUS, ENVIRONMENT_TYPE) VALUES (?, ?, ?, ?, ?, ?)",
      [env.id, env.name, env.location, env.capacity, env.status, env.type]
    );
    return response;
  } catch (e) {
    if (e.errno == 1062) return "DUPLICATE";
    if (e.errno == 1048) return "NULL";
    return "ERROR";
  }
};

export const updateEnvironment = async (env) => {
  try {
    const response = await pool.query(
      "UPDATE environment SET ENVIRONMENT_ID = ?, ENVIRONMENT_NAME = ?, ENVIRONMENT_LOCATION = ?, ENVIRONMENT_CAPACITY = ?, ENVIRONMENT_STATUS = ?, ENVIRONMENT_TYPE = ? WHERE ENVIRONMENT_ID = ?",
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
    return response;
  } catch (e) {
    if (e.errno == 1062) return "DUPLICATE";
    if (e.errno == 1048) return "NULL";
    return "ERROR";
  }
};

export const changeStateEnvironment = async (id, status) => {
  try {
    const response = await pool.query(
      "UPDATE environment SET ENVIRONMENT_STATUS = ? WHERE ENVIRONMENT_ID = ?",
      [status, id]
    );
    return response;
  } catch (e) {
    if (e.errno == 1062) return "DUPLICATE";
    if (e.errno == 1048) return "NULL";
    return e.message;
  }
};

export const getEnvironmentById = async (id) => {
  const [response] = await pool.query("SELECT * FROM environment WHERE ENVIRONMENT_ID = ?",
  [id]);
  return response[0];
};

export const getAllEnvironmentsActived = async () => {
    const [response] = await pool.query("SELECT * FROM environment WHERE ENVIRONMENT_STATUS = 0");
    return response;
  };
