import { Router } from "express";
import { getAllCompetences, getAllPrograms , getCompetenceById, getCompetenceByProgram, getCompetencesByProgram, getProgramById, getCompetenceByName} from "../apis/apiProgramsCompetence.js"

const routerApiProgramCompetence = Router();
const pathBase = '/apiProgramCompetences/';


/**
 * Obtiene todos los programas 
 * @returns {Promise<Array<Object>>} Un array de objetos que representan los programas.
 */
routerApiProgramCompetence.get(pathBase + 'getAllPrograms', async (req, res) => {
    const programs = await getAllPrograms();
    res.send(programs);
});


/**
 * Obtiene un programa específico por su ID pasado por el request body.
 * @returns {Promise<Object|null>} Un objeto que representa el programa encontrado, PROGRAM_ID=-1 si no se encontró.
 */
routerApiProgramCompetence.get(pathBase + 'getProgramById', async (req, res) => {
    const {id}=req.body;
    const program = await getProgramById(id);
    res.send(program);
});

/**
 * Obtiene un programa específico por su ID pasado por el request body.
 * @returns {Promise<Object|null>} Un objeto que representa el programa encontrado, PROGRAM_ID=-1 si no se encontró.
 */
routerApiProgramCompetence.get(pathBase + 'getAllCompetences', async (req, res) => {
    const {id}=req.body;
    const program = await getAllCompetences();
    res.send(program);
});

/**
 * Obtiene una competencia específica por su ID pasado por el request body.
 * @returns {Promise<Object|null>} Un objeto que representa el programa encontrado, COMPETENCE_ID=-1 si no se encontró.
 */
routerApiProgramCompetence.get(pathBase + 'getCompetencesById', async (req, res) => {
    const {id}=req.body;
    const program = await getCompetenceById(id);
    res.send(program);
});

/**
 * Obtiene una competencia específica por su ID pasado por el request body.
 * @returns {Promise<Array<Object>|null>} Un Array donde su primera posicion es el programa y la segunda es un array con las competencias.
 */
routerApiProgramCompetence.get(pathBase + 'getCompetencesByProgram', async (req, res) => {
    const {id}=req.body;
    const info = await getCompetencesByProgram(id);
    res.send(info);
});


/**
 * Obtiene la competencia de un programa academico especifo (los ids se pasan por request body)
 * @returns {Object}Objeto con la informacion del programa y su competencia, los IDs seran
 * -1 en caso de que no exista el programa, la compentecia, o la competencia para ese programa 
 */
routerApiProgramCompetence.get(pathBase + 'getCompetenceByProgram', async (req, res) => {
    const {idCompetence,idProgram}=req.body;
    const info = await getCompetenceByProgram(idCompetence,idProgram);
    res.send(info);
});

/**
 * Obtiene una competencia específica por su nombre pasado por el request body.
 * @returns {Promise<Object|null>} Un objeto que representa la competencia encontrada, COMPETENCE_ID=-1 si no se encontró.
 */
routerApiProgramCompetence.get(pathBase + 'getCompetenceByName', async (req, res) => {
    const {name}=req.body;
    const program = await getCompetenceByName(name);
    res.send(program);
});


export default routerApiProgramCompetence;