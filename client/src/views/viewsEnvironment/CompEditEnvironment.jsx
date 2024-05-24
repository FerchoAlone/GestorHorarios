import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js';

function CompEditEnvironment({ handleClose, environment }) {
  const [name, setName] = useState(environment.ENVIRONMENT_NAME);
  const [location, setLocation] = useState(environment.ENVIRONMENT_LOCATION);
  const [type, setType] = useState(environment.ENVIRONMENT_TYPE); 
  const [capacity, setCapacity] = useState(environment.ENVIRONMENT_CAPACITY);
  const [isActive, setIsActive] = useState(environment.ENVIRONMENT_STATUS);

  const changeActive = () => {
    setIsActive(prevIsActive => (prevIsActive === "1" ? "0" : "1"));
  };

  const handleTypeChange = (typeSelected) => {
    setType(typeSelected);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/environment/updateEnvironment", {
        id: environment.ENVIRONMENT_ID,
        name,
        location,
        type,
        capacity,
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
      console.error("Error updating environment:", error);
      await Swal.fire({
        text: 'Hubo un error al actualizar el ambiente. Por favor, inténtalo de nuevo.',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Ambiente</h5>
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
                <label className="form-label">Código:</label>
                <input
                  type="text"
                  className="form-control"
                  value={environment.ENVIRONMENT_ID}
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
                  minLength="3"
                  maxLength="50"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Ubicación:</label>
                <input
                  type="text"
                  className="form-control"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  minLength="2"
                  maxLength="50"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tipo de Ambiente:</label>
                <div className="mb-3">
                  <label className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      checked={type === "PRESENCIAL"}
                      onChange={() => handleTypeChange("PRESENCIAL")}
                    />
                    Presencial
                  </label>
                  <label className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      checked={type === "VIRTUAL"}
                      onChange={() => handleTypeChange("VIRTUAL")}
                    />
                    Virtual
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Capacidad:</label>
                <input
                  type="number"
                  className="form-control"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  required
                  max="100"
                />
              </div>
              <div className="mb-3">
                <button
                  type="button"
                  className={`btn ${isActive === "1" ? "btn-success" : "btn-danger"}`}
                  onClick={changeActive}
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

export default CompEditEnvironment;
