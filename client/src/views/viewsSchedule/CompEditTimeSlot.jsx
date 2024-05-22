import React, { useEffect, useState,useCallback } from "react";
import axios from "axios";
import Select from "react-select";

const CompEditTimeSlot = ({ handleClose, timeSlot, initProgram }) => {
  const [academicPeriod] = useState(timeSlot.PERIOD_NAME);
  const [program] = useState(initProgram.PROGRAM_NAME);
  const [environment, setEnvironment] = useState(
    timeSlot.ENVIRONMENT_NAME + " - " + timeSlot.ENVIRONMENT_LOCATION
  );
  const [teacher, setTeacher] = useState(
    timeSlot.TEACHER_FIRSTNAME + " " + timeSlot.TEACHER_LASTNAME
  );
  const [competence, setCompetence] = useState({COMPETENCE_NAME:timeSlot.COMPETENCE_NAME,COMPETENCE_ID:timeSlot.COMPETENCE_ID});
  const [duration, setDuration] = useState(timeSlot.SCHEDULE_DURATION);

  const [competences, setCompetences] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [environments, setEnvironments] = useState([]);

  const getCompetences = useCallback(async () => {
    const id = initProgram.PROGRAM_ID;
    const response = await axios.get(
      `http://localhost:3001/apiProgramCompetences/getCompetencesByProgram/${id}`
    );
    setCompetences(response.data["1"]);
  },[initProgram.PROGRAM_ID]);

  const handleCompetenceChange = ({ value }) => {
    setCompetence(
      competences.find((competence) => competence.COMPETENCE_ID === value)
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de guardar la franja horaria
  };

  useEffect(() => {
    getCompetences();
  }, [getCompetences]);

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
                <div className="input-group">
                  <select
                    className="form-select"
                    value={environment}
                    onChange={(e) => setEnvironment(e.target.value)}
                    readOnly
                  >
                    <option value="Laboratorio 4 - FET">
                      Laboratorio 4 - FET
                    </option>
                    <option value="Laboratorio 3 - FET">
                      Laboratorio 3 - FET
                    </option>
                  </select>
                  <span className="input-group-text">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Docente:</label>
                <div className="input-group">
                  <select
                    className="form-select"
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                  >
                    <option value="Francisco Olarte">Francisco Olarte</option>
                    <option value="Otro Docente">Otro Docente</option>
                  </select>
                  <span className="input-group-text">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Competencia:</label>
                <Select
                  placeholder="Seleccionar competencia"
                  defaultValue={{value:competence.COMPETENCE_ID,label:competence.COMPETENCE_NAME}}
                  options={competences.map((competence) => {
                    return {
                      value: competence.COMPETENCE_ID,
                      label: competence.COMPETENCE_NAME,
                    };
                  })}
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
                  Guardar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleClose}
                >
                  Eliminar franja
                </button>
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
