import {Router} from "express";
import { getAllTeachers, createTeacher, getActiveTeachers, getTeacherById, updateTeacher, changeTeacherStatus } from "../services/serviceTeacher.js"; 

const routerTeacher = Router();
const pathBase = '/teacher/';

routerTeacher.get(pathBase + "getAll", async (req, res) => {
    const response = await getAllTeachers();
    res.json(response);
});

routerTeacher.get(pathBase + "getActiveTeachers", async (req, res) => {
    const response = await getActiveTeachers();
    res.json(response);
});

routerTeacher.get(pathBase + "getById", async (req, res) => {
    const {id} = req.body;
    const teacher = await getTeacherById(id);
    res.json(teacher);
});

routerTeacher.post(pathBase + "createTeacher", async (req, res) => {
    const {id,name,lastname,typeIdentification,identification,type,typeContract,area,status} = req.body;
    const teacher = {id,name,lastname,typeIdentification,identification,type,typeContract,area,status};
    const response = await createTeacher(teacher);
    res.json(response);
});

routerTeacher.post(pathBase + "updateTeacher", async (req, res) => {
    const {id,name,lastname,typeIdentification,identification,type,typeContract,area,status} = req.body;
    const teacher = {id,name,lastname,typeIdentification,identification,type,typeContract,area,status};
    const response = await updateTeacher(teacher);
    res.json(response);
});

routerTeacher.post(pathBase + "changeTeacherStatus", async (req, res) => {
    const {id,status} = req.body;
    const response = await changeTeacherStatus(id,status);
    res.json(response);
});

export default routerTeacher;