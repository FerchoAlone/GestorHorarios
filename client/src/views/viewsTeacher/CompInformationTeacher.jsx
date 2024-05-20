import React from "react";

function CompInformationTeacher({ handleClose, id }) {
  // Información simulada de un docente
  const teacherInfo = {
    code: id,
    name: "Juan",
    lastname: "Pérez",
    idType: "C.C",
    identification: "123456789",
    contractType: "PT - Planta",
    area: "Ciencias",
  };

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Información del Docente {id}</h5>
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
                {teacherInfo.name}
              </div>
              <div className="mb-2 text-center">
                <strong>Apellido: </strong>
                {teacherInfo.lastname}
              </div>
              <div className="mb-2 text-center">
                <strong>Tipo Identificación: </strong>
                {teacherInfo.idType}
              </div>
              <div className="mb-2 text-center">
                <strong>Identificación: </strong>
                {teacherInfo.identification}
              </div>
              <div className="mb-2 text-center">
                <strong>Tipo Contrato: </strong>
                {teacherInfo.contractType}
              </div>
              <div className="mb-2 text-center">
                <strong>Área: </strong>
                {teacherInfo.area}
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
