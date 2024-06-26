import { Router } from "express";
import {
  getScheduleByTeacherAndPeriod,
  getScheduleByPeriodProgramEnvironment,
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot
} from "../services/facadeSchedule.js";
import { authMiddleware } from "../services/serviceLogin.js";

const routerSchedule = Router();
const pathBase = "/schedule/";

routerSchedule.get(
  pathBase + "getScheduleByTeacherAndPeriod/:PERIOD_ID/:TEACHER_ID",
  async (req, res) => {
    const { PERIOD_ID, TEACHER_ID } = req.params;
    const schedule = await getScheduleByTeacherAndPeriod(PERIOD_ID, TEACHER_ID);
    res.send(schedule);
  }
);

routerSchedule.get(
  pathBase + "getScheduleByPeriodProgramEnvironment/:PERIOD_ID/:PROGRAM_ID/:ENVIRONMENT_ID",
  async (req, res) => {
    const { PERIOD_ID, PROGRAM_ID, ENVIRONMENT_ID } = req.params;
    console.log(PERIOD_ID, PROGRAM_ID, ENVIRONMENT_ID);
    const schedule = await getScheduleByPeriodProgramEnvironment(
      PERIOD_ID,
      PROGRAM_ID,
      ENVIRONMENT_ID
    );
    res.send(schedule);
  }
);

routerSchedule.post(pathBase + "createTimeSlot",async (req, res) => {
  const {ENVIRONMENT_ID,TEACHER_ID,PROGRAM_ID,COMPETENCE_ID, PERIOD_ID,SCHEDULE_DAY,SCHEDULE_START_TIME,SCHEDULE_DURATION} = req.body;
  const timeSlot = {ENVIRONMENT_ID,TEACHER_ID,PROGRAM_ID,COMPETENCE_ID, PERIOD_ID,SCHEDULE_DAY,SCHEDULE_START_TIME,SCHEDULE_DURATION};
  const response = await createTimeSlot(timeSlot);
  res.send(response);
});

routerSchedule.post(pathBase + "updateTimeSlot", async (req, res) => {
  const {ENVIRONMENT_ID,TEACHER_ID,PROGRAM_ID,COMPETENCE_ID, PERIOD_ID,SCHEDULE_DAY,SCHEDULE_START_TIME,SCHEDULE_DURATION,SCHEDULE_ID} = req.body;
  const timeSlot = {ENVIRONMENT_ID,TEACHER_ID,PROGRAM_ID,COMPETENCE_ID, PERIOD_ID,SCHEDULE_DAY,SCHEDULE_START_TIME,SCHEDULE_DURATION,SCHEDULE_ID};
  const response = await updateTimeSlot(timeSlot);
  res.send(response);
});

routerSchedule.delete(pathBase + "deleteTimeSlot/:SCHEDULE_ID", async (req, res) => {
    const { SCHEDULE_ID } = req.params;
    console.log(SCHEDULE_ID);
    const response = await deleteTimeSlot(SCHEDULE_ID);
    res.send(response);
});
export default routerSchedule;
