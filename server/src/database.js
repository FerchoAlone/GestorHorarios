import {createPool} from 'mysql2/promise'
import dotenv from 'dotenv';
dotenv.config();

const pool = createPool({
    host:'localhost',
    port:'3306',
    user:'admin',
    password:'admin',
    database:'smdatabase'
});

export default pool;