import React, { useState } from "react";

function CompEditPeriodAcademic({ handleClose, id }) {
  const [name, setName] = useState("Dname");
  const [dateStart, setDateStart] = useState("DdateStart");
  const [dateEnd, setDateEnd] = useState("DdateEnd");
  const [isActive, setIsActive] = useState(false);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de guardar los cambios
  };

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
            <form onSubmit={(e)=>handleSaveChanges(e)}>
              <div className="mb-3">
                <label className="form-label">Identificación:</label>
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
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha de inicio:</label>
                <input
                  type="date"
                  className="form-control"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha Final:</label>
                <input
                  type="date"
                  className="form-control"
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                  readOnly
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

export default CompEditPeriodAcademic;
