import React from "react";

function CompInfoEnviorement({ handleClose, environment }) {

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered " role="document">
        <div className="modal-content">
          <div className="modal-header ">
            <h5 className="modal-title">Información Ambiente</h5>
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
                <strong>Codigo: </strong> {environment.ENVIRONMENT_ID}
              </div>
              <div className="mb-2 text-center">
                <strong>Nombre:</strong> {environment.ENVIRONMENT_NAME}
              </div>
              <div className="mb-2 text-center">
                <strong>Ubicacion: </strong> {environment.ENVIRONMENT_LOCATION}
              </div>
              <div className="mb-2 text-center">
                <strong>Tipo ambiente: </strong> {environment.ENVIRONMENT_TYPE}
              </div>
              <div className="mb-2 text-center">
                <strong>Capacidad: </strong> {environment.ENVIRONMENT_CAPACITY}
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
