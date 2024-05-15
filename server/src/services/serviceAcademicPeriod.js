import pool from '../database.js';

export const getAllAcademicPeriod = async() =>{
    const [response] = await pool.query('SELECT * FROM ACADEMIC_PERIOD')
    return response;
}

export const createAcademicPeriod = async (create) => {
    try {
      const response = await pool.query(
        "INSERT INTO ACADEMIC_PERIOD (PERIOD_ID, PERIOD_START_DATE, PERIOD_DURATION, PERIOD_NAME, PERIOD_STATUS) VALUES (?, ?, ?, ?, ?)",
        [create.id, create.datestart, create.duration, create.name, create.status]
      );
      return {state: "SUCCESS", message: "Periodo Academico creado con exito :D "};
    }catch(e){
        if(e.errno== 1048 ) return "NULL";
        if(e.errno== 1062 ) return "DUPLICATE";
        return e;
    }
};

export const updateAcademicPeriod = async (updt)=>{
    try{
        const response = await pool.query(
            "UPDATE ACADEMIC_PERIOD SET PERIOD_START_DATE=?, PERIOD_DURATION=?, PERIOD_NAME=?, PERIOD_STATUS=? WHERE PERIOD_ID=?;",
            [updt.datestart, updt.duration, updt.name, updt.status, updt.id]
        );
    return {state: "SUCCESS", message: "Periodo Academico editado con exito :D "};
    }
    catch(e){
        if(e.errno== 1048 ) return "NULL";
        if(e.errno== 1062 ) return "DUPLICATE";
        return e;
    }
}

export const getAcademicPeriodById = async(id) =>{
    const [response] = await pool.query('SELECT * FROM ACADEMIC_PERIOD WHERE PERIOD_ID=?;', [id]);
    if(response[0]) return response[0];
    return {PERIOD_ID:-1};
}

export const changeAcademicPeriod = async (chang)=>{
    try{
        const response = await pool.query(
            "UPDATE ACADEMIC_PERIOD SET PERIOD_STATUS=? WHERE PERIOD_ID=?;",
            [chang.status, chang.id]
        );
    return {state: "SUCCESS", message: "Se cambio el estado con exito :D "};
    }
    catch(e){
        if(e.errno== 1048 ) return "NULL";
        if(e.errno== 1062 ) return "DUPLICATE";
        return e;
    }
};

export const getActiveAcademicPeriod = async()=>{
    const [response] = await pool.query('SELECT * FROM ACADEMIC_PERIOD WHERE PERIOD_STATUS = 1')
    return response;
}