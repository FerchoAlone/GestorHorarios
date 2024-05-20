import React, { useState } from "react";

function CompCreateTeacher() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [idType, setIdType] = useState("");
  const [identification, setIdentification] = useState("");
  const [teacherType, setTeacherType] = useState("");
  const [contractType, setContractType] = useState("");
  const [area, setArea] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de envío del formulario
    console.log({
      name,
      lastname,
      idType,
      identification,
      teacherType,
      contractType,
      area,
    });
  };

  return (
    <div className="container ">
      <form onSubmit={handleSubmit} className="border border-dark rounded p-4">
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Nombre:</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control form-control-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength="2"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Apellido:</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control form-control-sm"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              minLength="2"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Tipo de Identificación:</label>
          <div className="col-sm-9 d-flex justify-content-center">
            <div className="form-check me-3">
              <input
                type="radio"
                className="form-check-input"
                name="idType"
                value="C.C"
                checked={idType === "C.C"}
                onChange={() => setIdType("C.C")}
                required
              />
              <label className="form-check-label">C.C</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="idType"
                value="Pasaporte"
                checked={idType === "Pasaporte"}
                onChange={() => setIdType("Pasaporte")}
                required
              />
              <label className="form-check-label">Pasaporte</label>
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Identificación:</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control form-control-sm"
              value={identification}
              onChange={(e) => setIdentification(e.target.value)}
              required
              pattern="\d+"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Tipo de Docente:</label>
          <div className="col-sm-9 d-flex justify-content-center">
            <div className="form-check me-3">
              <input
                type="radio"
                className="form-check-input"
                name="teacherType"
                value="Tecnico"
                checked={teacherType === "Tecnico"}
                onChange={() => setTeacherType("Tecnico")}
                required
              />
              <label className="form-check-label">Técnico</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="teacherType"
                value="Profesional"
                checked={teacherType === "Profesional"}
                onChange={() => setTeacherType("Profesional")}
                required
              />
              <label className="form-check-label">Profesional</label>
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Tipo de Contrato:</label>
          <div className="col-sm-9 d-flex justify-content-center">
            <div className="form-check me-3">
              <input
                type="radio"
                className="form-check-input"
                name="contractType"
                value="PT"
                checked={contractType === "PT"}
                onChange={() => setContractType("PT")}
                required
              />
              <label className="form-check-label">PT - Planta</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="contractType"
                value="CNT"
                checked={contractType === "CNT"}
                onChange={() => setContractType("CNT")}
                required
              />
              <label className="form-check-label">CNT - Contratista</label>
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Área:</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control form-control-sm"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Crear Docente</button>
      </form>
    </div>
  );
}
export default CompCreateTeacher;
