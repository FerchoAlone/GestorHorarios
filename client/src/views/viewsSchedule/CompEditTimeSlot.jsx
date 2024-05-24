import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";

const CompEditTimeSlot = ({ handleClose, timeSlot, initProgram ,iniPeriod}) => {
  const [competences, setCompetences] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [environments, setEnvironments] = useState([]);

  const creating=timeSlot.SCHEDULE_ID===-1? true : false;
  const [academicPeriod] = useState(iniPeriod.PERIOD_NAME);
  const [program] = useState(initProgram.PROGRAM_NAME);
  const [environment, setEnvironment] = useState({
    value: timeSlot.ENVIRONMENT_ID? timeSlot.ENVIRONMENT_ID : -1,
    label: timeSlot.ENVIRONMENT_NAME && timeSlot.ENVIRONMENT_LOCATION? timeSlot.ENVIRONMENT_NAME + " - " + timeSlot.ENVIRONMENT_LOCATION : "Sin ambiente asignado",
  });
  const [teacher, setTeacher] = useState({
    value: timeSlot.TEACHER_ID? timeSlot.TEACHER_ID : -1,
    label: timeSlot.TEACHER_LASTNAME && timeSlot.TEACHER_FIRSTNAME? timeSlot.TEACHER_LASTNAME + " " + timeSlot.TEACHER_FIRSTNAME : "Sin docente asignado",
  });
  const [competence, setCompetence] = useState({
    COMPETENCE_NAME: timeSlot.COMPETENCE_NAME,
    COMPETENCE_ID: timeSlot.COMPETENCE_ID,
  });
  const [duration, setDuration] = useState(timeSlot.SCHEDULE_DURATION);

  
  const token = localStorage.getItem("token");
  const getCompetences = useCallback(async () => {
    const id = initProgram.PROGRAM_ID;
    
    const response = await axios.get(
      `http://localhost:3001/apiProgramCompetences/getCompetencesByProgram/${id}`
    ,{headers: {Authorization: `Bearer ${token}`}});
    setCompetences(response.data["1"]);
  }, [initProgram.PROGRAM_ID,token]);

  const getTeachers = useCallback(async () => {
    const response = await axios.get(
      "http://localhost:3001/teacher/getActiveTeachers"
    ,{headers: {Authorization: `Bearer ${token}`}});
    setTeachers(response.data);
  }, [token]);

  const getEnvironments = useCallback(async () => {
    const response = await axios.get(
      "http://localhost:3001/environment/getEnvironmentsActived"
    ,{headers: {Authorization: `Bearer ${token}`}});
    setEnvironments(response.data);
  }, [token]);

  const handleCompetenceChange = ({ value }) => {
    setCompetence(
      competences.find((competence) => competence.COMPETENCE_ID === value)
    );
  };

  const handleTeacherChange = ({ value }) => {
    setTeacher(teachers.find((teacher) => teacher.TEACHER_ID === value));
  };

  const handleEnvironmentChange = ({ value }) => {
    console.log(value);
    setEnvironment(
      environments.find((environment) => environment.ENVIRONMENT_ID === value)
    );
  };

  const createSchedule = async () => {
    const data = {
      ENVIRONMENT_ID:environment.ENVIRONMENT_ID,
      TEACHER_ID:teacher.TEACHER_ID,  
      PROGRAM_ID:initProgram.PROGRAM_ID, 
      COMPETENCE_ID:competence.COMPETENCE_ID, 
      PERIOD_ID:iniPeriod.PERIOD_ID,
      SCHEDULE_DAY:timeSlot.SCHEDULE_DAY,
      SCHEDULE_START_TIME:timeSlot.SCHEDULE_START_TIME, 
      SCHEDULE_DURATION:duration
    };
    if(!data.COMPETENCE_ID || !data.ENVIRONMENT_ID===-1 || !data.TEACHER_ID===-1 || !data.PROGRAM_ID || !data.PERIOD_ID){
     alert("Por favor complete todos los campos");
     return;
    }
    const response = await axios.post("http://localhost:3001/schedule/createTimeSlot", data);
    if(response.data.state==="SUCCESS"){
      Swal.fire({
        text:response.data.message,
        icon: "success",
        timer: 1500
      });
      handleClose();
    }else{
      Swal.fire({
        text:response.data.message,
        icon: "error",
        timer: 1500
      });
      
    } 
  }
  const updateSchedule = async () => {
    const data = {
      ENVIRONMENT_ID:environment.value,
      TEACHER_ID:teacher.TEACHER_ID || teacher.value,  
      PROGRAM_ID:initProgram.PROGRAM_ID, 
      COMPETENCE_ID:competence.COMPETENCE_ID, 
      PERIOD_ID:iniPeriod.PERIOD_ID,
      SCHEDULE_DAY:timeSlot.SCHEDULE_DAY,
      SCHEDULE_START_TIME:timeSlot.SCHEDULE_START_TIME, 
      SCHEDULE_DURATION:duration,
      SCHEDULE_ID:timeSlot.SCHEDULE_ID
    };
    const res= await Swal.fire({
      text:"¿Está seguro que desea actualizar la franja horaria?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Sí",
    });
    if(!res.isConfirmed)return
    const response =await axios.post("http://localhost:3001/schedule/updateTimeSlot", data);
    if(response.data.state==="SUCCESS"){
      Swal.fire({
        text:response.data.message,
        icon: "success",
        timer: 1500
      });
      handleClose();
    }else{
      Swal.fire({
        text:response.data.message,
        icon: "error",
        timer: 1500
      });
    }
    
  }

  const handleSave = (e) => {
    e.preventDefault();
    if(creating){
      createSchedule();
    }else{
      updateSchedule();
    }
  };

  const handleDelete = async () => {
    const res = await Swal.fire({
      text:"¿Está seguro que desea eliminar la franja horaria?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
    });
    if(!res.isConfirmed)return;
    const response = await axios.delete('http://localhost:3001/schedule/deleteTimeSlot/'+timeSlot.SCHEDULE_ID);
    if(response.data.state==="SUCCESS"){
      Swal.fire({
        text:response.data.message,
        icon: "success",
        timer: 1500
      });
      handleClose();
    }else{
      Swal.fire({
        text:response.data.message,
        icon: "error",
        timer: 1500
      });
    
    }
  }

  useEffect(() => {
    getCompetences();
    getTeachers();
    getEnvironments();
  }, [getCompetences, getTeachers, getEnvironments]);

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Información Franja Horaria</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSave}>
              <div className="mb-3">
                <label className="form-label">Periodo académico:</label>
                <select
                  className="form-control"
                  value={academicPeriod}
                  disabled
                >
                  <option value="2024-1">2024-1</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label ">Programa:</label>
                <input
                  type="text"
                  className="form-control"
                  value={program}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Ambiente:</label>
                <Select
                  placeholder="Seleccionar docente"
                  defaultValue={environment}
                  options={Array.isArray(environments) ? environments.map((environment) => {
                    return {
                      value: environment.ENVIRONMENT_ID,
                      label: environment.ENVIRONMENT_NAME +
                        " - " +
                        environment.ENVIRONMENT_LOCATION,
                    };
                  }) : []}
                  onChange={handleEnvironmentChange}
                ></Select>
              </div>
              <div className="mb-3">
                <label className="form-label">Docente:</label>
                <Select
                  placeholder="Seleccionar docente"
                  defaultValue={teacher}
                  options={Array.isArray(teachers) ? teachers.map((teacher) => {
                    return {
                      value: teacher.TEACHER_ID,
                      label: teacher.TEACHER_LASTNAME + " " + teacher.TEACHER_FIRSTNAME,
                    };
                  }) : []}
                  onChange={handleTeacherChange}
                ></Select>
              </div>
              <div className="mb-3">
                <label className="form-label">Competencia:</label>
                <Select
                  placeholder="Seleccionar competencia"
                  defaultValue={{
                    value: competence.COMPETENCE_ID,
                    label: competence.COMPETENCE_NAME,
                  }}
                  options={Array.isArray(competences) ? competences.map((competence) => {
                    return {
                      value: competence.COMPETENCE_ID,
                      label: competence.COMPETENCE_NAME,
                    };
                  }) : []}                  
                  onChange={handleCompetenceChange}
                ></Select>
              </div>
              <div className="mb-3">
                <label className="form-label">Duración (en horas):</label>
                <input
                  type="number"
                  className="form-control"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  min="1"
                />
              </div>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">
                  {creating? "Crear franja" : "Actualizar franja"}
                </button>
                {!creating?<button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Eliminar franja
                </button>:<></>}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompEditTimeSlot;
