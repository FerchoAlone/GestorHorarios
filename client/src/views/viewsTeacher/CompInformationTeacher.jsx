import React from "react";

function CompInformationTeacher({ handleClose, teacher }) {

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Información del Docente {teacher.TEACHER_ID}</h5>
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
                <strong>Nombre: </strong>
                {teacher.TEACHER_FIRSTNAME}
              </div>
              <div className="mb-2 text-center">
                <strong>Apellido: </strong>
                {teacher.TEACHER_LASTNAME}
              </div>
              <div className="mb-2 text-center">
                <strong>Tipo Identificación: </strong>
                {teacher.TEACHER_IDTYPE}
              </div>
              <div className="mb-2 text-center">
                <strong>Identificación: </strong>
                {teacher.TEACHER_IDNUMBER}
              </div>
              <div className="mb-2 text-center">
                <strong>Tipo Contrato: </strong>
                {teacher.TEACHER_CONTRACTTYPE}
              </div>
              <div className="mb-2 text-center">
                <strong>Área: </strong>
                {teacher.TEACHER_AREA}
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

export default CompInformationTeacher;
