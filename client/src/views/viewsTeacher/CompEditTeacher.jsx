import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js';

function CompEditTeacher({ handleClose, teacher }) {
  const [name, setName] = useState(teacher.TEACHER_FIRSTNAME);
  const [lastname, setLastname] = useState(teacher.TEACHER_LASTNAME);
  const [typeContract, setTypeContract] = useState(teacher.TEACHER_CONTRACTTYPE);
  const [area, setArea] = useState(teacher.TEACHER_AREA);
  const [isActive, setIsActive] = useState(teacher.TEACHER_STATUS);

  const changeActive = (isActive) => {
    if(isActive==="1"){
      setIsActive("0");
    }else{
      setIsActive("1");
    }
  }

  const handletypeContractChange = (e) => {
    setTypeContract(e);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3001/teacher/updateTeacher", {id:teacher.TEACHER_ID, name, lastname, typeContract: typeContract || teacher.TEACHER_CONTRACTTYPE, area, status:isActive});
    Swal.fire({
      text: response.data.message,
      icon: response.data.state === "SUCCESS" ? 'success' : 'error',
      timer: 1200,
      showConfirmButton: false
    });
    handleClose();
  };

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editando docente {teacher.TEACHER_ID}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="container mt-1">
              <form className="border border-dark rounded p-4" onSubmit={handleSaveChanges}>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Identificación:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      value={teacher.TEACHER_ID}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Nombre:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      minLength="4"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Apellido:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      required
                      minLength="4"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Tipo de Contrato:</label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      value={typeContract}
                      onChange={(e) => handletypeContractChange(e.target.value)}
                    >
                      <option value="PT">PT - Planta</option>
                      <option value="CNT">CNT - Contratista</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Área:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      required
                      minLength="3"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-12 d-flex justify-content-center">
                    <button
                      type="button"
                      className={`btn ${isActive === "1" ? "btn-success" : "btn-danger"}`}
                      onClick={() => changeActive(isActive)}
                    >
                      {isActive === "1" ? "ACTIVO" : "INACTIVO"}
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 d-flex justify-content-center ">
                    <button
                      type="submit"
                      className="btn btn-primary me-2"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompEditTeacher;
