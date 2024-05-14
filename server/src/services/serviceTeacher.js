import pool from '../database.js';

export const getAllTeachers = async() =>{
    const [response] = await pool.query('SELECT * FROM teacher')
    return response;
}

export const getTeacherById = async(id) =>{
    const [response] = await pool.query('SELECT * FROM teacher WHERE id = ?', [id])
    return response[0];
}

export const createTeacher = async(teacher) =>{
    try {
        const response = await pool.query(
          "INSERT INTO teacher (TEACHER_ID, TEACHER_FIRSTNAME, TEACHER_LASTNAME, TEACHER_IDTYPE, TEACHER_IDNUMBER, TEACHER_TYPE,TEACHER_CONTRACTTYPE,TEACHER_AREA,TEACHER_STATUS) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [teacher.id, teacher.name, teacher.lastname, teacher.typeIdentification, teacher.identification, teacher.type,teacher.typeContract,teacher.area, teacher.status]
        );
        return response;
      } catch (e) {
        if (e.errno == 1062) return "DUPLICATE";
        if (e.errno == 1048) return "NULL";
        return "ERROR";
      }
}

export const updateTeacher = async(teacher) =>{
    try {
        const response = await pool.query(
          "UPDATE teacher SET TEACHER_ID = ?, TEACHER_FIRSTNAME = ?, TEACHER_LASTNAME = ?, TEACHER_IDTYPE = ?, TEACHER_IDNUMBER = ?, TEACHER_TYPE = ?, TEACHER_CONTRACTTYPE = ?, TEACHER_AREA = ?, TEACHER_STATUS = ? WHERE id = ?",
          [teacher.id, teacher.name, teacher.lastname, teacher.typeIdentification, teacher.identification, teacher.type,teacher.typeContract,teacher.area, teacher.status, teacher.id]
        );
        return response;
      } catch (e) {
        if (e.errno == 1062) return "DUPLICATE";
        if (e.errno == 1048) return "NULL";
        return "ERROR";
      }
}

export const changeTeacherStatus = async(id,status) =>{
    try {
        const response = await pool.query(
          "UPDATE teacher SET TEACHER_STATUS = ? WHERE id = ?",
          [status, id]
        );
        return response;
      } catch (e) {
        if (e.errno == 1062) return "DUPLICATE";
        if (e.errno == 1048) return "NULL";
        return e.message;
      }
}

export const getActiveTeachers = async() =>{
    const [response] = await pool.query('SELECT * FROM teacher WHERE TEACHER_STATUS = 1')
    return response;
}




