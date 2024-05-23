import React from "react";

function CompInformationTimeSlot({ handleClose , timeslot}) {
  // Datos ficticios para la demostración
  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Información detallada</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <p><strong>Competencia:</strong> {timeslot.COMPETENCE_NAME?timeslot.COMPETENCE_NAME:"N/A"}</p>
            <p><strong>Ambiente:</strong> {timeslot.ENVIRONMENT_NAME?timeslot.ENVIRONMENT_NAME:"N/A"}</p>
            <p><strong>Ubicación ambiente:</strong> {timeslot.ENVIRONMENT_LOCATION?timeslot.ENVIRONMENT_LOCATION:"N/A"}</p>
            <p><strong>Duración:</strong> {timeslot.SCHEDULE_DURATION?timeslot.SCHEDULE_DURATION:"N/A"}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompInformationTimeSlot;
