import { Router } from "express";
import {getAllEnvironments,addEnvironment, updateEnvironment,changeStateEnvironment,getEnvironmentById,getAllEnvironmentsActived} from "../services/serviceEnviroment.js";

const routerEnviroment = Router();
const pathBase = '/environment/';

routerEnviroment.get(pathBase + 'getAll', async (req, res) => {
    const enviroments = await getAllEnvironments();
    res.send(enviroments);
});

routerEnviroment.post(pathBase + 'addEnvironment', async (req, res) => {
    const {id,name,location,capacity,status,type } = req.body;
    const env={id,name,location,capacity,status,type}; 
    const response = await addEnvironment(env);
    res.send(response);
    
});

routerEnviroment.post(pathBase + 'updateEnvironment', async (req, res) => {
    const {id,name,location,capacity,status,type } = req.body;
    const env={id,name,location,capacity,status,type}; 
    const response = await updateEnvironment(env);
    res.send(response);
    
});

routerEnviroment.post(pathBase + 'changeStateEnvironment', async (req, res) => {
    const {id,status} = req.body;
    const response = await changeStateEnvironment(id,status);
    res.send(response);
    
});


routerEnviroment.get(pathBase + 'getEnvironmentById', async (req, res) => {
    const {id}=req.body;
    const enviroments = await getEnvironmentById(id);
    res.send(enviroments);
});


routerEnviroment.get(pathBase + 'getEnvironmentsActived', async (req, res) => {
    const enviroments = await getAllEnvironmentsActived();
    res.send(enviroments);
});

export default routerEnviroment;
