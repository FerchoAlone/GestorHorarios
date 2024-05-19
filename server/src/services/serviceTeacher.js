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
  if(response[0]) return response[0];
    return {TEACHER_ID:-1};
};

export const createTeacher = async (teacher) => {
  let connection;
  try {
    connection = await pool.getConnection();
    connection.beginTransaction();
    const [response] = await connection.query(
      "INSERT INTO teacher (TEACHER_FIRSTNAME, TEACHER_LASTNAME, TEACHER_IDTYPE, TEACHER_IDNUMBER, TEACHER_TYPE,TEACHER_CONTRACTTYPE,TEACHER_AREA,TEACHER_STATUS) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)",
      [
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


    const userLogin = teacher.name.slice(0, 3).toLowerCase() + response.insertId;
    const userPassword = "12345678";

    const [userResponse] = await connection.query(
      "INSERT INTO user (TEACHER_ID, USER_LOGIN, USER_PASSWORD, USER_TYPE) VALUES ( ?, ?, ?, ?)",
      [response.insertId, userLogin, userPassword, "DOCENTE"]
    );

    await connection.commit();

    return {
      status: "SUCCESS",
      message: "Profesor creado exitosamente.",
    };
  } catch (e) {
    if (connection) {
      connection.release();
    }
    if (e.errno == 1062) {
      return {
        status: "ERROR",
        message: "Ya existe un profesor con ese identificador (ID)",
      };
    };
    if (e.errno == 1048){
      return {
        status: "ERROR",
        message: "Informacion incompleta: Por favor, complete todos los campos obligatorios."
      };
    };
    return {
      status: "ERROR",
      message: "Ah ocurrido un error creando al docente, docente NO creado"
    };
  }
};

export const updateTeacher = async (teacher) => {
  try {
    const response = await pool.query(
      "UPDATE teacher SET TEACHER_FIRSTNAME = ?, TEACHER_LASTNAME = ?, TEACHER_CONTRACTTYPE = ?, TEACHER_AREA = ?, TEACHER_STATUS = ? WHERE TEACHER_ID = ?",
      [
        teacher.name,
        teacher.lastname,
        teacher.typeContract,
        teacher.area,
        teacher.status,
        teacher.id
      ]
    );
    return { state: "SUCCESS", message: "Profesor actualizado exitosamente" };
  } catch (e) {
    if (e.errno == 1062){
      return {
        state: "ERROR",
        message: "Ya existe un profesor con ese identificador (ID)",
      };
    };
    if (e.errno == 1048){
      return {
        state: "ERROR",
        message: "Informacion incompleta: Por favor, complete todos los campos obligatorios."
      };
    };
    return { state: "ERROR", message: "Ha ocurrido un error al actualizar el profesor. Profesor NO actualizado" };
  }
};

export const changeTeacherStatus = async (id, status) => {
  try {
    const response = await pool.query(
      "UPDATE teacher SET TEACHER_STATUS = ? WHERE TEACHER_ID = ?",
      [status, id]
    );
    return { state: "SUCCESS", message: "Estado del profesor actualizado exitosamente" };
  } catch (e) {
    return { state: "ERROR", message: "Ha ocurrido un error al actualizar el estado del profesor. Estado del profesor NO actualizado" };
  }
};

export const getActiveTeachers = async () => {
  const [response] = await pool.query(
    "SELECT * FROM teacher WHERE TEACHER_STATUS = 1"
  );
  return response;
};

export const getTeacherByName = async (name) => {
  const stringQuery = '%'+name+'%';
  const [response] = await pool.query(
    "SELECT * FROM teacher WHERE TEACHER_FIRSTNAME LIKE ?",
    [stringQuery]
  );
  return response;
};
