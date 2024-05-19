import pool from "../database.js";
import { getTeacherById } from "./serviceTeacher.js";

const verifyEnvironmentAvailability = async (timeSlot, forUpdate = false) => {
  var [response] = [];
  if (forUpdate) {
    [response] = await pool.query(
      "SELECT * FROM schedule WHERE ENVIRONMENT_ID = ? AND SCHEDULE_DAY = ? AND SCHEDULE_ID != ?",
      [timeSlot.ENVIRONMENT_ID, timeSlot.SCHEDULE_DAY, timeSlot.SCHEDULE_ID]
    );
  } else {
    [response] = await pool.query(
      "SELECT * FROM schedule WHERE ENVIRONMENT_ID = ? AND SCHEDULE_DAY = ?",
      [timeSlot.ENVIRONMENT_ID, timeSlot.SCHEDULE_DAY]
    );
  }
  for (var i = 0; i < response.length; i++) {
    const duration =
      parseInt(response[i].SCHEDULE_START_TIME) +
      parseInt(response[i].SCHEDULE_DURATION);
    if (
      parseInt(timeSlot.SCHEDULE_START_TIME) >=
        parseInt(response[i].SCHEDULE_START_TIME) &&
      timeSlot.SCHEDULE_START_TIME < duration
    ) {
      return false;
    }
  }

  return true;
};

const verifyTeacherAvailability = async (timeSlot, forUpdate = false) => {
  for (var i = 0; i < timeSlot.SCHEDULE_DURATION; i++) {
    var [response] = [];
    if (forUpdate) {
      [response] = await pool.query(
        "SELECT * FROM schedule WHERE TEACHER_ID = ? AND SCHEDULE_DAY = ? AND SCHEDULE_START_TIME = ? AND SCHEDULE_ID != ?",
        [
          timeSlot.TEACHER_ID,
          timeSlot.SCHEDULE_DAY,
          timeSlot.SCHEDULE_START_TIME + i,
          timeSlot.SCHEDULE_ID,
        ]
      );
    } else {
      [response] = await pool.query(
        "SELECT * FROM schedule WHERE TEACHER_ID = ? AND SCHEDULE_DAY = ? AND SCHEDULE_START_TIME = ?",
        [
          timeSlot.TEACHER_ID,
          timeSlot.SCHEDULE_DAY,
          timeSlot.SCHEDULE_START_TIME + i,
        ]
      );
    }
    if (response.length > 0) {
      return false;
    } else {
      return true;
    }
  }
};

const verifyHoursTeacher = async (timeSlot, forUpdate = false) => {
  const teacher = await getTeacherById(timeSlot.TEACHER_ID);
  //OBTENER HORAS AL DIA DEL DOCENTE
  const [dailyData] = await pool.query(
    "SELECT * FROM schedule WHERE TEACHER_ID = ? AND SCHEDULE_DAY = ?",
    [timeSlot.TEACHER_ID, timeSlot.SCHEDULE_DAY]
  );
  var totalDailyHours = 0;
  for (var i = 0; i < dailyData.length; i++) {
    if (forUpdate && dailyData[i].SCHEDULE_ID == parseInt(timeSlot.SCHEDULE_ID))
      continue;
    console.log(dailyData[i]);
    console.log(timeSlot.SCHEDULE_ID);
    totalDailyHours += parseInt(dailyData[i].SCHEDULE_DURATION);
  }
  if (
    totalDailyHours + parseInt(timeSlot.SCHEDULE_DURATION) >
    (teacher.TEACHER_CONTRACTTYPE === "PLT" ? 8 : 10)
  ) {
    return {
      state: "ERROR",
      message:
        "El docente ya ha alcanzado el máximo de horas diarias permitidas",
    };
  }
  //OBTENER HORAS A LA SEMANA DEL DOCENTE
  const [weeklyData] = await pool.query(
    "SELECT * FROM schedule WHERE TEACHER_ID = ?",
    [timeSlot.TEACHER_ID]
  );
  var totalWeeklyHours = 0;
  for (var i = 0; i < weeklyData.length; i++) {
    if (forUpdate && dailyData[i].SCHEDULE_ID == parseInt(timeSlot.SCHEDULE_ID))
      continue;
    totalWeeklyHours += parseInt(weeklyData[i].SCHEDULE_DURATION);
  }
  if (
    totalWeeklyHours + parseInt(timeSlot.SCHEDULE_DURATION) >
    (teacher.TEACHER_CONTRACTTYPE === "PLT" ? 32 : 40)
  ) {
    return {
      state: "ERROR",
      message:
        "El docente ya ha alcanzado el máximo de horas semanales permitidas",
    };
  }

  return { state: "SUCCESS" };
};

export const createTimeSlot = async (timeSlot) => {
  //VALIDAR DISPONIBILIDAD DE AMBIENTE
  const availabilityEnvironment = await verifyEnvironmentAvailability(timeSlot);
  if (!availabilityEnvironment) {
    return {
      state: "ERROR",
      message: "El ambiente ya se encuentra ocupado en el horario seleccionado",
    };
  }

  //VALIDAR DISPONIBILIDAD DEL DOCENTE
  const availabilityTeacher = await verifyTeacherAvailability(timeSlot);
  if (!availabilityTeacher) {
    return {
      state: "ERROR",
      message: "El docente ya se encuentra ocupado en el horario seleccionado",
    };
  }

  //VALIDAR REGLAS NEGOCIO DOCENTE
  const availabilityHours = await verifyHoursTeacher(timeSlot);
  if (availabilityHours.state === "ERROR") return availabilityHours;
  //INSERTAR HORARIO
  try {
    const [response] = await pool.query("INSERT INTO schedule SET ?", timeSlot);
    return {
      state: "SUCCESS",
      message: "Horario registrado exitosamente",
    };
  } catch (e) {
    //return e;
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
        "Ha ocurrido un error al registrar el horario. horario NO registrado",
    };
  }
};

export const updateTimeSlot = async (timeSlot) => {
  //VALIDAR DISPONIBILIDAD DE AMBIENTE
  const availabilityEnvironment = await verifyEnvironmentAvailability(
    timeSlot,
    true
  );
  if (!availabilityEnvironment) {
    return {
      state: "ERROR",
      message: "El ambiente ya se encuentra ocupado en el horario seleccionado",
    };
  }

  //VALIDAR DISPONIBILIDAD DEL DOCENTE
  const availabilityTeacher = await verifyTeacherAvailability(timeSlot, true);
  if (!availabilityTeacher) {
    return {
      state: "ERROR",
      message: "El docente ya se encuentra ocupado en el horario seleccionado",
    };
  }

  //VALIDAR REGLAS NEGOCIO DOCENTE
  const availabilityHours = await verifyHoursTeacher(timeSlot, true);
  if (availabilityHours.state === "ERROR") return availabilityHours;
  //ACTUALIZAR HORARIO
  try {
    const [response] = await pool.query(
      "UPDATE schedule SET  SCHEDULE_DURATION = ?, ENVIRONMENT_ID = ?, TEACHER_ID = ? ,COMPETENCE_ID=? WHERE SCHEDULE_ID = ?",
      [
        timeSlot.SCHEDULE_DURATION,
        timeSlot.ENVIRONMENT_ID,
        timeSlot.TEACHER_ID,
        timeSlot.COMPETENCE_ID,
        timeSlot.SCHEDULE_ID,
      ]
    );
    return {
      state: "SUCCESS",
      message: "Horario actualizado exitosamente",
    };
  } catch (error) {
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
        "Ha ocurrido un error al actualizar el horario. horario NO actualizado",
    };
  }
};

export const deleteTimeSlot = async (SCHEDULE_ID) => {
  try {
    const [response] = await pool.query(
      "DELETE FROM schedule WHERE SCHEDULE_ID = ?",
      [SCHEDULE_ID]
    );
    return { state: "SUCCESS", message: "Horario eliminado exitosamente" };
  } catch (error) {
    return {
      state: "ERROR",
      message:
        "Ha ocurrido un error al eliminar el horario. Horario NO eliminado",
    };
  }
};

export const getScheduleByPeriodProgramEnvironment = async (
  PERIOD_ID,
  PROGRAM_ID,
  ENVIRONMENT_ID
) => {
  const [timeslots] = await pool.query(
    "SELECT * FROM schedule WHERE PERIOD_ID = ? AND PROGRAM_ID = ? AND ENVIRONMENT_ID = ? ORDER BY SCHEDULE_START_TIME",
    [PERIOD_ID, PROGRAM_ID, ENVIRONMENT_ID]
  );

  const scheduleByDays = {};
  timeslots.forEach((schedule) => {
    const day = schedule.SCHEDULE_DAY;
    if (!scheduleByDays[day]) {
      scheduleByDays[day] = [];
    }
    scheduleByDays[day].push(schedule);
  });

  return scheduleByDays;
};

export const getScheduleByTeacherAndPeriod = async (PERIOD_ID, TEACHER_ID) => {
  const [timeslots] = await pool.query(
    "SELECT * FROM schedule WHERE PERIOD_ID = ? AND TEACHER_ID = ? ORDER BY SCHEDULE_START_TIME",
    [PERIOD_ID, TEACHER_ID]
  );
  const scheduleByDays = {};
  timeslots.forEach((schedule) => {
    const day = schedule.SCHEDULE_DAY;
    if (!scheduleByDays[day]) {
      scheduleByDays[day] = [];
    }
    scheduleByDays[day].push(schedule);
  });
  return scheduleByDays;
};
