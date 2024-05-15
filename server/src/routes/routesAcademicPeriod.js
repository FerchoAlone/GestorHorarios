import { Router } from "express"; 
import {getAllAcademicPeriod, createAcademicPeriod, updateAcademicPeriod, getAcademicPeriodById, changeAcademicPeriod, getActiveAcademicPeriod} from "../services/serviceAcademicPeriod.js"


const routerAcademicPeriod = Router();
const pathBase = '/academicPeriod/';

routerAcademicPeriod.get(pathBase + 'getAll',async (req, res) =>{
    try {
        const academicPeriod = await getAllAcademicPeriod();
        res.send(academicPeriod);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving environments', error });
      }
});

routerAcademicPeriod.post(pathBase + 'createAcademicPeriod', async(req, res)=>{
    const {id, datestart, duration, name, status} = req.body;
    const create = {id, datestart, duration, name, status};
    const response = await createAcademicPeriod (create);
    res.send(response);
});

routerAcademicPeriod.post(pathBase + 'updateAcademicPeriod', async(req, res)=>{
  const {id, datestart, duration, name, status} = req.body;
  const updt = {id, datestart, duration, name, status};
  const response = await updateAcademicPeriod (updt);
  res.send(response);
});

routerAcademicPeriod.get(pathBase + 'getAcademicPeriodById', async(req, res)=>{
  try {
    const {id}=req.body;
    const response = await getAcademicPeriodById(id);
    res.send(response);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving environments', error });
  }
} );

routerAcademicPeriod.post(pathBase + 'changeAcademicPeriod', async(req, res)=>{
  const {id, status} = req.body;
  const chang = {id, status};
  const response = await changeAcademicPeriod (chang);
  res.send(response);
});

routerAcademicPeriod.get(pathBase + 'getActiveAcademicPeriod',async (req, res) =>{
  try {
      const academicPeriod = await getActiveAcademicPeriod();
      res.send(academicPeriod);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving environments', error });
    }
});

export default routerAcademicPeriod;