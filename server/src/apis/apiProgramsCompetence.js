import pool from "../database.js";

/**
 * Obtiene todos los programas almacenados en la base de datos.
 * @returns {Promise<Array<Object>>} Un array de objetos que representan los programas.
 */
export const getAllPrograms = async () => {
  const [response] = await pool.query("SELECT * FROM program");
  return response;
};


/**
 * Obtiene un programa específico por su ID.
 * @param {number} id El ID del programa a buscar.
 * @returns {Promise<Object|null>} Un objeto que representa el programa encontrado, PROGRAM_ID=-1 si no se encontró.
 */
export const getProgramById = async (id) => {
  const [response] = await pool.query("SELECT * FROM program WHERE PROGRAM_ID = ?", [id]);
  if(response[0])return response[0];
  return {PROGRAM_ID:-1};
};

/**
 * Obtiene todas las competencias almacenadas en la base de datos.
 * @returns {Promise<Array<Object>>} Un array de objetos que representan las competencias.
 */
export const getAllCompetences = async () => {
  const [response] = await pool.query("SELECT * FROM competence");
  return response;
};

/**
 * Obtiene una competencia específica por su ID.
 * @param {number} id El ID de la competencia a buscar.
 * @returns {Promise<Object|null>} Un objeto que representa el programa encontrado, COMPETENCE_ID=-1 si no se encontró.
 */
export const getCompetenceById = async (id) => {
  const [response] = await pool.query("SELECT * FROM competence WHERE COMPETENCE_ID = ?",[id]);
  if(response[0])return response[0];
  return {COMPETENCE_ID:-1};
};

/**
 * Obtiene las competencias de un programa academico espcifo
 * @param {number} id El ID del programa
 * @returns {Promise<Array<Object>} Un Array donde su primera posicion es el programa y la segunda es un array con las competencias.
 */
export const getCompetencesByProgram = async (id) => {

  const program = await getProgramById(id);
  const [competences] = await pool.query("SELECT c.* FROM competence c INNER JOIN program_competence pc ON c.COMPETENCE_ID = pc.COMPETENCE_ID WHERE pc.PROGRAM_ID = ?", [id]);
  return [program,competences];
};


/**
 * Obtiene la competencia de un programa academico especifo
 * @param {number} idProgram El ID del programa
 * @param {number} idCompetence El ID de la competencia
 * @returns {Object}Objeto con la informacion del programa y su competencia, los IDs seran
 * -1 en caso de que no exista el programa, la compentecia, o la competencia para ese programa 
 */
export const getCompetenceByProgram = async (idCompetence,idProgram) => {

  const [info] = await pool.query(`
    SELECT c.*, p.*
    FROM competence c
    INNER JOIN program_competence pc ON c.COMPETENCE_ID = pc.COMPETENCE_ID
    INNER JOIN program p ON p.PROGRAM_ID = pc.PROGRAM_ID
    WHERE c.COMPETENCE_ID = ? AND p.PROGRAM_ID = ?`, [idCompetence, idProgram]);
  if(info[0])return info[0];
  return {COMPETENCE_ID:-1, PROGRAM_ID:-1};
};