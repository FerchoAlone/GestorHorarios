import React from "react";

function CompInfoAcademicPeriod({ handleClose, id }) {
  // Información simulada de un período académico
  const periodoInfo = {
    id: "00001",
    nombre: "2024-1",
    fechaInicio: "02-02-2024",
    fechaFin: "02-05-2024",
  };

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered " role="document">
        <div className="modal-content">
          <div className="modal-header ">
            <h5 className="modal-title">Información Período Académico {id}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="mb-2 text-center">
                <strong>Id:</strong> {periodoInfo.id}
              </div>
              <div className="mb-2 text-center">
                <strong>Nombre:</strong> {periodoInfo.nombre}
              </div>
              <div className="mb-2 text-center">
                <strong>Fecha Inicio:</strong> {periodoInfo.fechaInicio}
              </div>
              <div className="mb-2 text-center">
                <strong>Fecha Fin:</strong> {periodoInfo.fechaFin}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClose}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompInfoAcademicPeriod;
