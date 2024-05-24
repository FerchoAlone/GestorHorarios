import React, { useEffect, useState, useContext, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Select from "react-select";
import CompEditTimeSlot from "./CompEditTimeSlot";
import { AuthContext } from "../AuthProvider";

function CompScheduleCoor() {
  const { logout } = useContext(AuthContext);
  const [schedule, setSchedule] = useState({
    "07:00 ": [],
    "08:00 ": [],
    "09:00 ": [],
    "10:00 ": [],
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
  const scheduleHours = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];
  const [academicPeriods, setAcademicPeriods] = useState([]);
  const [academicPeriod, setAcademicPeriod] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [program, setProgram] = useState([]);
  const [environments, setEnvironments] = useState([]);
  const [environment, setEnvironment] = useState([]);

  const getAcademicPeriods = useCallback(async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:3001/academicPeriod/getActiveAcademicPeriod",
      {
        headers: {
          Authorization: "bearer " + token,
        },
      }
    );
    if (response.data.state === "TOKEN") {
      logout();
      return;
    }
    setAcademicPeriods(response.data);
  }, [logout]);

  const handleAcademicPeriodChange = ({ value }) => {
    setAcademicPeriod(
      academicPeriods.find(
        (academicPeriod) => academicPeriod.PERIOD_ID === value
      )
    );
  };

  const getPrograms =useCallback(async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:3001/apiProgramCompetences/getAllPrograms"
    ,{
      headers: {
        Authorization: "bearer " + token,
      },
    });
    if (response.data.state === "TOKEN") {
      logout();
      return;
    }
    setPrograms(response.data);
  },[logout]);

  const handleProgramsChange = ({ value }) => {
    setProgram(programs.find((program) => program.PROGRAM_ID === value));
  };

  const getEnviroments = useCallback(async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:3001/environment/getEnvironmentsActived"
    ,{
      headers: {
        Authorization: "bearer " + token,
      },
    });
    if (response.data.state === "TOKEN") {
      logout();
      return;
    }
    setEnvironments(response.data);
  },[logout]);

  const handleEnviromentChange = ({ value }) => {
    setEnvironment(
      environments.find((enviroment) => enviroment.ENVIRONMENT_ID === value)
    );
  };

  const handleQuerySchedule = async () => {
    const ENVIRONMENT_ID = environment.ENVIRONMENT_ID;
    const PROGRAM_ID = program.PROGRAM_ID;
    const PERIOD_ID = academicPeriod.PERIOD_ID;
    if (!ENVIRONMENT_ID || !PROGRAM_ID || !PERIOD_ID) {
      alert("Por favor seleccione todos los campos");
      return;
    }
    const response = await axios.get(
      `http://localhost:3001/schedule/getScheduleByPeriodProgramEnvironment/${PERIOD_ID}/${PROGRAM_ID}/${ENVIRONMENT_ID}`
    );
    setSchedule(response.data);
  };

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  useEffect(() => {
    getAcademicPeriods();
    getPrograms();
    getEnviroments();
  }, [getAcademicPeriods,getPrograms,getEnviroments]);

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [timeSlotSelected, setTimeSlotSelected] = useState({});
  const handleShowModalEdit = (timeSlot) => {
    setShowModalEdit(true);
    setTimeSlotSelected(timeSlot);
  };
  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
    setTimeSlotSelected(null);
    handleQuerySchedule();
  };

  return (
    <>
      <div className="row ">
        <nav className="col-md-2 d-none d-md-block sidebar">
          <div className="sidebar-sticky p-4">
            <ul className="nav fs-4">
              <li className="nav-item d-flex align-items-center">
                <a className="nav-link ms-4" href="/management">
                  <i className="fa-solid fa-house fs-1"></i>
                </a>
                <div className="dropdown ml-2">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    ¿Qué desea hacer?
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a
                      className="dropdown-item"
                      href="/managementAcademicPeriod"
                    >
                      Gestionar Periodo Academico
                    </a>
                    <a className="dropdown-item" href="/managementTeacher">
                      Gestionar Docente
                    </a>
                    <a className="dropdown-item" href="/managementEnvironment">
                      Gestionar Ambiente
                    </a>
                    <a className="dropdown-item" href="/managementSchedule">
                      Gestionar Horarios
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <div className="col-md-10 p-4 mt-2">
          <h1 className="h1 text-center fw-bold">Gestionar horario</h1>
        </div>
      </div>
      <div className="container mt-1">
        <div className="row mb-4">
          <div className="col-1"></div>
          <div className="col-3">
            <label>Seleccionar periodo académico:</label>
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
          </div>
          <div className="col-3">
            <label>Programa:</label>
            <Select
              placeholder="Seleccionar programa"
              options={programs.map((program) => {
                return {
                  value: program.PROGRAM_ID,
                  label: program.PROGRAM_NAME,
                };
              })}
              onChange={handleProgramsChange}
            ></Select>
          </div>
          <div className="col-3">
            <label>Seleccionar ambiente:</label>
            <Select
              placeholder="Seleccionar ambiente"
              options={environments.map((enviroment) => {
                return {
                  value: enviroment.ENVIRONMENT_ID,
                  label:
                    enviroment.ENVIRONMENT_NAME +
                    "-" +
                    enviroment.ENVIRONMENT_LOCATION,
                };
              })}
              onChange={handleEnviromentChange}
            ></Select>
          </div>
          <div className="col-2 text-center mt-4">
            <button className="btn btn-dark" onClick={handleQuerySchedule}>
              Consultar
            </button>
          </div>
        </div>
      </div>
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
                        key={
                          activity.SCHEDULE_DAY +
                          "-" +
                          activity.SCHEDULE_START_TIME
                        }
                        onClick={() => handleShowModalEdit(activity)}
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
      {showModalEdit && (
        <CompEditTimeSlot
          handleClose={handleCloseModalEdit}
          timeSlot={timeSlotSelected}
          initProgram={program}
          iniPeriod={academicPeriod}
        />
      )}
    </>
  );
}

export default CompScheduleCoor;

