import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Select from "react-select";
import { AuthContext } from "../AuthProvider";
import CompoInformationTimeSlot from "./CompInformationTimeSlot";

const CompViewTeacher = () => {
  const [schedule, setSchedule] = useState({
    "08:00 ": [],
    "09:00 ": [],
    "10:00 ": [],
    "07:00 ": [],
    "11:00 ": [],
    "12:00 ": [],
    "13:00 ": [],
    "14:00 ": [],
    "15:00 ": [],
    "16:00 ": [],
    "17:00 ": [],
    "18:00 ": [],
    "19:00 ": [],
    "20:00 ": [],
    "21:00 ": [],
  });
  const scheduleHours = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];
  const [academicPeriods, setAcademicPeriods] = useState([]);
  const [academicPeriod, setAcademicPeriod] = useState([]);
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  const [timeSlot,setTimeSlot]=useState({});
  const [showModalInfo, setShowModalInfo] = useState(false);

  const handleTimeSlotChange=(timeslot)=>{
    setShowModalInfo(true)
    setTimeSlot(timeslot);
  }

  const handleCloseModalInfo = () => {
    setShowModalInfo(false);
    setTimeSlot(null);
  };

  const [teacher, setTeacher] = useState({});
  useEffect(() => {
    const GetTeacher = async () => {
      const id = localStorage.getItem("id");;
      const response = await axios.get("http://localhost:3001/teacher/getById/" + id);
      console.log(response);
      setTeacher(response.data);
    };
    GetTeacher();
  }, []);

  const { logout } = useContext(AuthContext);

  const getAcademicPeriods = async () => {
    const response = await axios.get(
      "http://localhost:3001/academicPeriod/getActiveAcademicPeriod"
    );
    setAcademicPeriods(response.data);
  };

  const handleAcademicPeriodChange = ({ value }) => {
    setAcademicPeriod(
      academicPeriods.find(
        (academicPeriod) => academicPeriod.PERIOD_ID === value
      )
    );
  };
  useEffect(() => {
    getAcademicPeriods();
  }, []);




  const handleQuerySchedule = async () => {

    const PERIOD_ID = academicPeriod.PERIOD_ID;
    const TEACHER_ID = localStorage.getItem("id");
    if (!PERIOD_ID) {
      alert("Por favor seleccione todos los campos");
      return;
    }
    const response = await axios.get("http://localhost:3001/schedule/getScheduleByTeacherAndPeriod/" + PERIOD_ID + "/" + TEACHER_ID);
    setSchedule(response.data);
  };





  return (
    <div className="container-fluid mt-5">
      <div className="card">
        <div className="card-header position-relative">
          <h2 className="text-center">Bienvenido {teacher.TEACHER_FIRSTNAME}</h2>
          <button className="btn btn-outline-secondary position-absolute end-0" style={{ top: '50%', transform: 'translateY(-60%)' }} onClick={logout}>
            Cerrar sesión <i className="bi bi-box-arrow-right"></i>
          </button>
        </div>
        <div className="card-body row">
          <div className="col-md-3">
            <div className="d-flex flex-column align-items-center">
              {teacher.IMAGE_URL ? (
                <img src={teacher.IMAGE_URL} alt="User" className="rounded-circle mb-3" width="100" />
              ) : (
                <i className="bi bi-person-circle mb-3" style={{ fontSize: "6rem", color: "orange" }}></i>
              )}
              <h4 className="mt-2">Información</h4>
              <p>Nombre completo: {teacher.TEACHER_FIRSTNAME} {teacher.TEACHER_LASTNAME}</p>
              <p>Cédula: {teacher.TEACHER_IDNUMBER}</p>
              <p>Tipo: {teacher.TEACHER_TYPE}</p>
              <p>Contrato: {teacher.TEACHER_CONTRACTTYPE}</p>
              <p>Área: {teacher.TEACHER_AREA}</p>
              <div className="mt-3">
                <Select
                  placeholder="Seleccionar periodo"
                  options={academicPeriods.map((academicPeriod) => {
                    return {
                      value: academicPeriod.PERIOD_ID,
                      label: academicPeriod.PERIOD_NAME,
                    };
                  })}
                  onChange={handleAcademicPeriodChange}
                ></Select>
                <button className="btn btn-primary mt-2" onClick={handleQuerySchedule}>
                  Consultar horario
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-1"></div>
              <div className="col-10">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="col border text-center" scope="col">
                        Hora
                      </th>
                      {days.map((day) => (
                        <th
                          key={day}
                          className="col border text-center bg-warning"
                          scope="col"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleHours.map((time) => (
                      <tr>
                        <td key={time} className="col-1 border text-center bg-light">
                          {time}
                        </td>
                        {Array.isArray(schedule[time]) &&
                          schedule[time].map((activity) => (
                            <td
                              style={{ cursor: "pointer" }}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor = "lightblue")
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor = "")
                              }
                              key={activity.SCHEDULE_DAY + '-' + activity.SCHEDULE_START_TIME}
                              onClick={()=>handleTimeSlotChange(activity)}
                            >
                              {activity.COMPETENCE_NAME} {activity.ENVIRONMENT_NAME}
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="col-1"></div>
            </div>
          </div>
        </div>
      </div>
      {showModalInfo && <CompoInformationTimeSlot handleClose={handleCloseModalInfo} timeslot={timeSlot} />}
    </div>


  );
}

export default CompViewTeacher;
