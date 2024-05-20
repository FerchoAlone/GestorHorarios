import React from "react";

function CompInfoEnviorement({ handleClose, id }) {
  // Información simulada de un período académico
  const periodoInfo = {
    id: "AA001",
    nombre: "Salon 415",
    ubicacion: "FIET",
    tipoAmbiente: "Virtual",
    capacidad: "25 estudiantes",
  };

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered " role="document">
        <div className="modal-content">
          <div className="modal-header ">
            <h5 className="modal-title">Información Ambiente {id}</h5>
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
                <strong>Codigo: </strong> {periodoInfo.id}
              </div>
              <div className="mb-2 text-center">
                <strong>Nombre:</strong> {periodoInfo.nombre}
              </div>
              <div className="mb-2 text-center">
                <strong>Ubicacion: </strong> {periodoInfo.ubicacion}
              </div>
              <div className="mb-2 text-center">
                <strong>Tipo ambiente: </strong> {periodoInfo.tipoAmbiente}
              </div>
              <div className="mb-2 text-center">
                <strong>Capacidad: </strong> {periodoInfo.capacidad}
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

export default CompInfoEnviorement;
