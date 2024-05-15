import pool from "../database.js";

export const getAllTeachers = async () => {
  const [response] = await pool.query("SELECT * FROM teacher");
  return response;
};

export const getTeacherById = async (id) => {
  const [response] = await pool.query(
    "SELECT * FROM teacher WHERE TEACHER_ID = ?",
    [id]
  );
  return response[0];
};

export const createTeacher = async (teacher) => {
  let connection;
  try {
    connection = await pool.getConnection();
    connection.beginTransaction();
    const [response] = await connection.query(
      "INSERT INTO teacher (TEACHER_ID, TEACHER_FIRSTNAME, TEACHER_LASTNAME, TEACHER_IDTYPE, TEACHER_IDNUMBER, TEACHER_TYPE,TEACHER_CONTRACTTYPE,TEACHER_AREA,TEACHER_STATUS) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        teacher.id,
        teacher.name,
        teacher.lastname,
        teacher.typeIdentification,
        teacher.identification,
        teacher.type,
        teacher.typeContract,
        teacher.area,
        teacher.status,
      ]
    );


    const userLogin = teacher.name.slice(0, 3).toLowerCase() + teacher.id;
    const userPassword = "12345678";

    const [userResponse] = await connection.query(
      "INSERT INTO user (USER_ID, TEACHER_ID, USER_LOGIN, USER_PASSWORD, USER_TYPE) VALUES (?, ?, ?, ?, ?)",
      [teacher.id,teacher.id, userLogin, userPassword, "DOCENTE"]
    );

    await connection.commit();

    return response;
  } catch (e) {
    if (e.errno == 1062) return "DUPLICATE";
    if (e.errno == 1048) return "NULL";
    return e;
  } finally {
    if (connection) {
      connection.release();
    } // Liberar la conexión
  }
};

export const updateTeacher = async (teacher) => {
  try {
    const response = await pool.query(
      "UPDATE teacher SET TEACHER_ID = ?, TEACHER_FIRSTNAME = ?, TEACHER_LASTNAME = ?, TEACHER_IDTYPE = ?, TEACHER_IDNUMBER = ?, TEACHER_TYPE = ?, TEACHER_CONTRACTTYPE = ?, TEACHER_AREA = ?, TEACHER_STATUS = ? WHERE TEACHER_ID = ?",
      [
        teacher.id,
        teacher.name,
        teacher.lastname,
        teacher.typeIdentification,
        teacher.identification,
        teacher.type,
        teacher.typeContract,
        teacher.area,
        teacher.status,
        teacher.id,
      ]
    );
    return response;
  } catch (e) {
    if (e.errno == 1062) return "DUPLICATE";
    if (e.errno == 1048) return "NULL";
    return "ERROR";
  }
};

export const changeTeacherStatus = async (id, status) => {
  try {
    const response = await pool.query(
      "UPDATE teacher SET TEACHER_STATUS = ? WHERE TEACHER_ID = ?",
      [status, id]
    );
    return response;
  } catch (e) {
    if (e.errno == 1062) return "DUPLICATE";
    if (e.errno == 1048) return "NULL";
    return e.message;
  }
};

export const getActiveTeachers = async () => {
  const [response] = await pool.query(
    "SELECT * FROM teacher WHERE TEACHER_STATUS = 1"
  );
  return response;
};
