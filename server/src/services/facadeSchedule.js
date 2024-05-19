import pool from "../database.js";
import { getTeacherById } from "./serviceTeacher.js";

const verifyEnvironmentAvailability = async (timeSlot) => {
  for (var i = 0; i < timeSlot.duration; i++) {
    const [response] = await pool.query(
      "SELECT * FROM schedule WHERE ENVIRONMENT_ID = ? AND SCHEDULE_DAY = ? AND SCHEDULE_START_TIME = ?",
      [timeSlot.environment_id, timeSlot.schedule_day, timeSlot.start_time + i]
    );
    if (response.length > 0) {
      return false;
    } else {
      return true;
    }
  }
};

const verifyTeacherAvailability = async (timeSlot) => {
  for (var i = 0; i < timeSlot.duration; i++) {
    const [response] = await pool.query(
      "SELECT * FROM schedule WHERE TEACHER_ID = ? AND SCHEDULE_DAY = ? AND SCHEDULE_START_TIME = ?",
      [timeSlot.teacher_id, timeSlot.schedule_day, timeSlot.start_time + i]
    );
    if (response.length > 0) {
      return false;
    } else {
      return true;
    }
  }
};

const verifyHoursTeacher = async (timeSlot) => {
  const teacher = await getTeacherById(timeSlot.teacher_id);
  //OBTENER HORAS AL DIA DEL DOCENTE
  const [dailyData] = await pool.query(
    "SELECT * FROM schedule WHERE TEACHER_ID = ? AND SCHEDULE_DAY = ?",
    [timeSlot.teacher_id, timeSlot.schedule_day]
  );
  var totalDailyHours = 0;
  for (var i = 0; i < dailyData.length; i++) {
    totalDailyHours += dailyData[i].SCHEDULE_DURATION;
  }
  if (
    totalDailyHours + timeSlot.duration >
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
    [timeSlot.teacher_id]
  );
  var totalWeeklyHours = 0;
  for (var i = 0; i < weeklyData.length; i++) {
    totalWeeklyHours += weeklyData[i].SCHEDULE_DURATION;
  }
  if (
    totalWeeklyHours + timeSlot.duration >
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
        "Ha ocurrido un error al registrar el horario. horario NO registrado",
    };
  }
};

export const updateTimeSlot = async (timeSlot) => {
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
  //ACTUALIZAR HORARIO
  try {
    const [response] = await pool.query(
      "UPDATE schedule SET  SCHEDULE_DURATION = ?, ENVIRONMENT_ID = ?, TEACHER_ID = ? ,COMPETENCE_ID=? WHERE SCHEDULE_ID = ?",
      [
        timeSlot.duration,
        timeSlot.environment_id,
        timeSlot.teacher_id,
        timeSlot.competence_id,
        timeSlot.schedule_id,
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

export const deleteTimeSlot = async (schedule_id) => {
  try {
    const [response] = await pool.query(
      "DELETE FROM schedule WHERE SCHEDULE_ID = ?",
      [schedule_id]
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
  period_id,
  program_id,
  environment_id
) => {
    const [timeslots] = await pool.query(
        "SELECT * FROM schedule WHERE SCHEDULE_PERIOD = ? AND PROGRAM_ID = ? AND ENVIRONMENT_ID = ?",
        [period_id, program_id, environment_id]
    );

    const scheduleByDays = {};
    timeslots.forEach(schedule => {
        const day = schedule.SCHEDULE_DAY;
        if (!scheduleByDays[day]) {
            scheduleByDays[day] = [];
        }
        scheduleByDays[day].push(schedule);
    });

    return scheduleByDays;
};

export const getScheduleByTeacherAndPeriod = async (period_id,teacher_id) => {
    const [timeslots] = await pool.query(
        "SELECT * FROM schedule WHERE SCHEDULE_PERIOD = ? AND TEACHER_ID = ?",
        [period_id, teacher_id]
    );
    const scheduleByDays = {};
    timeslots.forEach(schedule => {
        const day = schedule.SCHEDULE_DAY;
        if (!scheduleByDays[day]) {
            scheduleByDays[day] = [];
        }
        scheduleByDays[day].push(schedule);
    });
    return scheduleByDays;
}