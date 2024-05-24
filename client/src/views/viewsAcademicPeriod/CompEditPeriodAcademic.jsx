import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js';

function CompEditPeriodAcademic({ handleClose, periodEdit }) {
  const [name, setName] = useState(periodEdit.PERIOD_NAME);
  const [datestart, setDateStart] = useState(periodEdit.PERIOD_START_DATE.split('T')[0]);
  const [duration, setDuration] = useState(parseInt(periodEdit.PERIOD_DURATION));
  const [isActive, setIsActive] = useState(periodEdit.PERIOD_STATUS);
  const [dateend, setDateEnd] = useState('');

  const changeActive = (active) => {
    setIsActive(active === "1" ? "0" : "1");
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/academicPeriod/updateAcademicPeriod", {
        id: periodEdit.PERIOD_ID,
        datestart,
        duration,
        name,
        status: isActive
      });

      const res = response.data;
      await Swal.fire({
        text: res.message,
        icon: res.state === "SUCCESS" ? 'success' : 'error',
        timer: 1000,
        showConfirmButton: false
      });

      if (res.state === "SUCCESS") {
        handleClose();
      }
    } catch (error) {
      console.error("There was an error updating the academic period!", error);
      await Swal.fire({
        text: 'Hubo un error al actualizar el período académico. Por favor, inténtalo de nuevo.',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  useEffect(() => {
    if (datestart) {
      const startDate = new Date(datestart);
      const endDate = new Date(startDate.setMonth(startDate.getMonth() + duration));
      setDateEnd(endDate.toISOString().split('T')[0]);
    }
  }, [datestart, duration]);

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Período Académico</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSaveChanges}>
              <div className="mb-3">
                <label className="form-label">Identificación:</label>
                <input
                  type="text"
                  className="form-control"
                  value={periodEdit.PERIOD_ID}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  minLength="5"
                  maxLength="15"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha de inicio:</label>
                <input
                  type="date"
                  className="form-control"
                  value={datestart}
                  onChange={(e) => setDateStart(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Duración</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="duration"
                      id="threeMonths"
                      value={3}
                      checked={duration === 3}
                      onChange={() => setDuration(3)}
                      required
                    />
                    <label className="form-check-label" htmlFor="threeMonths">3 meses</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="duration"
                      id="sixMonths"
                      value={6}
                      checked={duration === 6}
                      onChange={() => setDuration(6)}
                    />
                    <label className="form-check-label" htmlFor="sixMonths">6 meses</label>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="dateend">Fecha Fin</label>
                <input
                  value={dateend}
                  type="date"
                  className="form-control"
                  id="dateend"
                  readOnly
                />
              </div>
              <div className="mb-3">
                <button
                  type="button"
                  className={`btn ${isActive === "1" ? "btn-success" : "btn-danger"}`}
                  onClick={() => changeActive(isActive)}
                >
                  {isActive === "1" ? "ACTIVO" : "INACTIVO"}
                </button>
              </div>
              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-primary me-3"
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
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
}

export default CompEditPeriodAcademic;
