import React, { useState, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import Swal from 'sweetalert2/dist/sweetalert2.js'

function CompCreateTeacher() {
  const { logout } = useContext(AuthContext)
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [typeIdentification, setIdType] = useState("");
  const [identification, setIdentification] = useState("");
  const [type, settype] = useState("");
  const [typeContract, settypeContract] = useState("");
  const [area, setArea] = useState("");

  const store = useCallback(async (e) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:3001/teacher/createTeacher", {
        name,
        lastname,
        typeIdentification,
        identification,
        type,
        typeContract,
        area,
        status: 1,
      }, {
        headers: {
          'Authorization': 'bearer ' + token
        }
      });
      if (response.data.state === "TOKEN") {
        logout();
        return;
      }
       Swal.fire({
        text: response.data.message,
        icon: response.data.status === "SUCCESS" ? 'success' : 'error',
        timer: 1200,
        showConfirmButton: false
      });
    } catch (error) {
      console.error("Error fetching periods:", error);
    }

  },[logout,name, lastname, typeIdentification, identification, type, typeContract, area]);

  return (
    <div className="container ">
      <form onSubmit={(e) => store(e)} className="border border-dark rounded p-4">
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Nombre:</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control form-control-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength="4"
              maxLength="50"
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
              minLength="4"
              maxLength="50"
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
                checked={typeIdentification === "C.C"}
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
                checked={typeIdentification === "Pasaporte"}
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
              maxLength="20"
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
                name="type"
                value="Tecnico"
                checked={type === "Tecnico"}
                onChange={() => settype("Tecnico")}
                required
              />
              <label className="form-check-label">Técnico</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="type"
                value="Profesional"
                checked={type === "Profesional"}
                onChange={() => settype("Profesional")}
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
                name="typeContract"
                value="PT"
                checked={typeContract === "PT"}
                onChange={() => settypeContract("PT")}
                required
              />
              <label className="form-check-label">PT - Planta</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="typeContract"
                value="CNT"
                checked={typeContract === "CNT"}
                onChange={() => settypeContract("CNT")}
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
              minLength="3"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Crear Docente</button>
      </form>
    </div>
  );
}
export default CompCreateTeacher;
