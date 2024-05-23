import {Router} from "express";
import { getAllTeachers, createTeacher, getActiveTeachers, getTeacherById, updateTeacher, changeTeacherStatus, getTeacherByName } from "../services/serviceTeacher.js"; 
import { authMiddleware } from "../services/serviceLogin.js";

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

routerTeacher.get(pathBase + "getById/:id", async (req, res) => {
    const {id} = req.params;
    const teacher = await getTeacherById(id);
    res.json(teacher);
});

routerTeacher.post(pathBase + "createTeacher", async (req, res) => {
    const {name,lastname,typeIdentification,identification,type,typeContract,area,status} = req.body;
    const teacher = {name,lastname,typeIdentification,identification,type,typeContract,area,status};
    const response = await createTeacher(teacher);
    res.json(response);
});

routerTeacher.post(pathBase + "updateTeacher", async (req, res) => {
    const {id,name,lastname,typeContract,area,status} = req.body;
    const teacher = {id,name,lastname,typeContract,area,status};
    const response = await updateTeacher(teacher);
    res.json(response);
});

routerTeacher.post(pathBase + "changeTeacherStatus", async (req, res) => {
    const {id,status} = req.body;
    const response = await changeTeacherStatus(id,status);
    res.json(response);
});

routerTeacher.get(pathBase + "getTeacherByName", async (req, res) => {
    const {name} = req.body;
    const teacher = await getTeacherByName(name);
    res.json(teacher);
});

export default routerTeacher;