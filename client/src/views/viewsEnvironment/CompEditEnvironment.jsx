import React, { useState } from "react";

function CompEditEnvironment({ handleClose, id }) {
  const [name, setName] = useState("a");
  const [location, setLocation] = useState("a");
  const [type, setType] = useState(null); // null: none selected, "Presencial", "Virtual"
  const [capacity, setCapacity] = useState(15);
  const [isActive, setIsActive] = useState(false);

  const handleTypeChange = (typeSelected) => {
    if (type === typeSelected) {
      setType(null); // Unselect if already selected
    } else {
      setType(typeSelected);
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de guardar los cambios
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
            <form onSubmit={(e)=>handleSaveChanges(e)}>
              <div className="mb-3">
                <label className="form-label">Código:</label>
                <input
                  type="text"
                  className="form-control"
                  value={id}
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
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tipo de Ambiente:</label>
                <div className="mb-3">
                  <label className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      checked={type === "Presencial"}
                      onChange={() => handleTypeChange("Presencial")}
                    />
                    Presencial
                  </label>
                  <label className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input "
                      checked={type === "Virtual"}
                      onChange={() => handleTypeChange("Virtual")}
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
                />
              </div>
              <div className="mb-3">
                <button
                  type="button"
                  className={`btn ${isActive ? "btn-success" : "btn-danger"}`}
                  onClick={() => setIsActive(!isActive)}
                >
                  {isActive ? "ACTIVO" : "INACTIVO"}
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
