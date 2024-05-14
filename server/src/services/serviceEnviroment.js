import pool from '../database.js';

const getAllEnvironments = async() =>{
    const [response] = await pool.query('SELECT * FROM environment')
    return response;
}