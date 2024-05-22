import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { TimeSlot } from "./TimeSlot";
import Select from "react-select";

function CompScheduleCoor() {
  const [schedule, setSchedule] = useState({
    "07:00 - 08:00": "",
    "08:00 - 09:00": "",
    "09:00 - 10:00": "",
    "10:00 - 11:00": "",
    "11:00 - 12:00": "",
    "12:00 - 13:00": "",
    "13:00 - 14:00": "",
    "14:00 - 15:00": "",
    "15:00 - 16:00": "",
    "16:00 - 17:00": "",
    "17:00 - 18:00": "",
    "18:00 - 19:00": "",
    "19:00 - 20:00": "",
    "20:00 - 21:00": "",
    "21:00 - 22:00": "",
  });

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

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
            <select className="form-select">
              <option>2024-1</option>
            </select>
          </div>
          <div className="col-3">
            <label>Programa:</label>
            <select className="form-select">
              <option>Ingeniería de sistemas</option>
            </select>
          </div>
          <div className="col-3">
            <label>Seleccionar ambiente:</label>
            <Select
                placeholder="Seleccionar ambiente"
                options={[{ value: "1", label: "Ambiente 1" }]}
            >
            </Select>
          </div>
          <div className="col-2 text-center mt-4">
            <button className="btn btn-dark">Consultar</button>
          </div>
        </div>
        <div className="row ">
          <div className="col-1 border text-center bg-light">
            <div className="p-2">Hora</div>
          </div>
          {days.map((day) => (
            <div key={day} className="col border text-center bg-warning">
              <div className="p-2">{day}</div>
            </div>
          ))}
        </div>
        {Object.keys(schedule).map((time) => (
          <div className="row" key={time}>
            <div className="col-1 border text-center bg-light">
              <div className="p-2">{time}</div>
            </div>
            {days.map((day) => (
              <div key={day} className="col border" onClick={()=>alert(day+time)}>
                <TimeSlot time={time} activity={schedule[time]} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default CompScheduleCoor;
