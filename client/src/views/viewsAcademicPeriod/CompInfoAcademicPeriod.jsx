import React, { useState, useEffect, useCallback } from "react";

function CompInfoAcademicPeriod({ handleClose, periodoInfo }) {
  const [dateend, setDateEnd] = useState('');


  const getEndDate = useCallback(() => {
    const startDate = new Date(periodoInfo.PERIOD_START_DATE);
    const endDate = new Date(startDate.setMonth(startDate.getMonth() + parseInt(periodoInfo.PERIOD_DURATION)));
    setDateEnd(endDate.toISOString().split('T')[0]);
  },[periodoInfo.PERIOD_DURATION, periodoInfo.PERIOD_START_DATE])
  useEffect(() => {
    getEndDate();
  }, [getEndDate])

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered " role="document">
        <div className="modal-content">
          <div className="modal-header ">
            <h5 className="modal-title">Información Período Académico</h5>
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
                <strong>Id:</strong> {periodoInfo.PERIOD_ID}
              </div>
              <div className="mb-2 text-center">
                <strong>Nombre:</strong> {periodoInfo.PERIOD_NAME}
              </div>
              <div className="mb-2 text-center">
                <strong>Fecha Inicio:</strong> {periodoInfo.PERIOD_START_DATE.split('T')[0]}
              </div>
              <div className="mb-2 text-center">
                <strong>Fecha Fin:</strong> {dateend}

              </div>
              <div className="mb-2 text-center">
                <strong>Duracion: </strong> {periodoInfo.PERIOD_DURATION}
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
