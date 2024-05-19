import { Router } from "express";
import {
  getScheduleByTeacherAndPeriod,
  getScheduleByPeriodProgramEnvironment,
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot
} from "../services/serviceSchedule.js";

const routerSchedule = Router();
const pathBase = "/schedule/";

routerSchedule.get(
  pathBase + "getScheduleByTeacherAndPeriod",
  async (req, res) => {
    const { period_id, teacher_id } = req.body;
    const schedule = await getScheduleByTeacherAndPeriod(period_id, teacher_id);
    res.send(schedule);
  }
);

routerSchedule.get(
  pathBase + "getScheduleByPeriodProgramEnvironment",
  async (req, res) => {
    const { period_id, program_id, environment_id } = req.body;
    const schedule = await getScheduleByPeriodProgramEnvironment(
      period_id,
      program_id,
      environment_id
    );
    res.send(schedule);
  }
);

routerSchedule.post(pathBase + "createTimeSlot", async (req, res) => {
  const { timeSlot } = req.body;
  const response = await createTimeSlot(timeSlot);
  res.send(response);
});

routerSchedule.post(pathBase + "updateTimeSlot", async (req, res) => {
  const { timeSlot } = req.body;
  const response = await updateTimeSlot(timeSlot);
  res.send(response);
});

routerSchedule.delete(pathBase + "deleteTimeSlot", async (req, res) => {
    const { schedule_id } = req.body;
    const response = await deleteTimeSlot(schedule_id);
    res.send(response);
});
export default routerSchedule;
