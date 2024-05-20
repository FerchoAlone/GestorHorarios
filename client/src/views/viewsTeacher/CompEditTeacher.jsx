import React, { useState } from "react";

function CompEditTeacher({ handleClose, id }) {
  const [name, setName] = useState("defaultName");
  const [lastname, setLastname] = useState("defaultLastname");
  const [contractType, setContractType] = useState("defaultContractType");
  const [area, setArea] = useState("defaultArea");
  const [isActive, setIsActive] = useState(false);

  const handleSaveChanges = () => {
    // Aquí puedes manejar la lógica de guardar los cambios
  };

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editando docente {id}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="container mt-1">
              <form className="border border-dark rounded p-4">
                <div className="row">
                  <div className="col-sm-7">
                    <div className="mb-3 d-flex align-items-center">
                      <label className="form-label me-3">Identificación:</label>
                      <input
                        type="text"
                        className="form-control text-center ms-2"
                        value={id}
                        readOnly // Para que el campo no sea editable
                        size="30" // Establece el tamaño del campo de texto
                      />
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <label className="form-label me-5">Nombre:</label>
                      <input
                        type="text"
                        className="form-control text-center ms-2 form-control-sm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        size="10" // Establece el tamaño del campo de texto
                        required
                        minLength="2"
                      />
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <label className="form-label me-5 text-center">
                        Apellido:
                      </label>
                      <input
                        type="text"
                        className="form-control text-center ms-2 form-control-sm"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        size="30" // Establece el tamaño del campo de texto
                        required
                        minLength="2"
                      />
                    </div>
                    <div className="mb-3 d-flex align-items-center ">
                      <label className="form-label me-4 ">
                        Tipo de Contrato:
                      </label>
                      <select
                        className="form-select ms-3"
                        value={contractType}
                        onChange={(e) => setContractType(e.target.value)}
                        style={{ width: "100%" }} // Ajusta el ancho del select al 100%
                      >
                        <option value="PT">PT - Planta</option>
                        <option value="CNT">CNT - Contratista</option>
                      </select>
                    </div>
                    <div className="mb-3 d-flex align-items-center inline">
                      <label className="form-label me-4 ms-3">Área:</label>
                      <input
                        type="text"
                        className="form-control text-center ms-5 form-control-sm"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        size="30" // Establece el tamaño del campo de texto
                        required
                        minLength="5"
                      />
                    </div>
                  </div>
                  <div className="col-sm-5 d-flex align-items-center justify-content-center">
                    <div className="mb-3" style={{ minWidth: "120px" }}>
                      <button
                        type="button"
                        className={`btn ${
                          isActive ? "btn-success" : "btn-danger"
                        }`}
                        onClick={() => setIsActive(!isActive)}
                      >
                        {isActive ? "ACTIVO" : "INACTIVO"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary me-3"
              onClick={handleSaveChanges}
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
        </div>
      </div>
    </div>
  );
}

export default CompEditTeacher;
