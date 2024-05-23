import React, { useState, useEffect,useContext ,useCallback} from "react";
import axios from "axios";

import CompInfoAcademicPeriod from "./CompInfoAcademicPeriod";
import CompEditPeriodAcademic from "./CompEditPeriodAcademic";
import { AuthContext } from "../AuthProvider";

const CompConsultPeriod = () => {
  const {logout}=useContext(AuthContext)
  const [periodAcademic, setPeriodAcademic] = useState({});
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [periods, setPeriods] = useState([]);
  const handleShowModalInfo = (period) => {
    setShowModalInfo(true);
    setPeriodAcademic(period);
  };

  const handleCloseModalInfo = () => {
    setShowModalInfo(false);
    setPeriodAcademic(null);
  };

  const handleShowModalEdit = (period) => {
    setShowModalEdit(true);
    setPeriodAcademic(period);
  };

  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
    setPeriodAcademic(null);
    fetchPeriods();
  };

  // Función para obtener todos los periodos académicos desde el backend
  const fetchPeriods = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/academicPeriod/getAll",{
        headers:{
          'Authorization':'bearer '+token
        }
      });
      if(response.data.state==="TOKEN"){
        logout();
        return;
      }
      setPeriods(response.data); // Actualizar el estado con los periodos académicos obtenidos
    } catch (error) {
      console.error("Error fetching periods:", error);
    }
  },[logout]);

  useEffect(() => {
    fetchPeriods(); // Llamar a fetchPeriods al montar el componente
  }, [fetchPeriods]); // El segundo argumento es un array vacío para que se ejecute solo una vez al montar el componente

  // Resto del código del componente aquí...

  const itemsPerPage = 7;
  const filteredPeriods = periods.filter(
    (period) =>
      period.PERIOD_NAME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedPeriods = filteredPeriods.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredPeriods.length / itemsPerPage);

  const toggleActiveStatus = async (id, status) => {

    if (status === "1") {
      await changeStateAcademicPeriod(id, "0");
    } else {
      await changeStateAcademicPeriod(id, "1");
    }

  };

  const changeStateAcademicPeriod = async (id, status) => {
    const url = "http://localhost:3001/academicPeriod/changeAcademicPeriod";
    const response = await axios.post(url, { id, status });
    if (response.data.state === "SUCCESS") {
      fetchPeriods();
    } else {
      alert(response.data.message);
    }

  }

  return (
    <div className="container mt-3">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-secondary">
          <i className="bi bi-search"></i>
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Fecha de Inicio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPeriods.map((period) => (
              <tr key={period.PERIOD_ID}>
                <td>{period.PERIOD_ID}</td>
                <td>{period.PERIOD_NAME}</td>
                <td>{period.PERIOD_START_DATE.split('T')[0]}</td>
                <td className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-link p-0"
                    onClick={() => handleShowModalInfo(period)}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <button
                    className="btn btn-link p-0"
                    onClick={() => handleShowModalEdit(period)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-link p-0"
                    onClick={() => toggleActiveStatus(period.PERIOD_ID, period.PERIOD_STATUS)}
                  >
                    {period.PERIOD_STATUS === "1" ? (
                      <i className="bi bi-toggle-on"></i>
                    ) : (
                      <i className="bi bi-toggle-off"></i>
                    )}
                  </button>
                  <span>{period.PERIOD_STATUS === "1" ? "Activo" : "Inactivo"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${index + 1 === currentPage ? "active" : ""
                  }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {showModalInfo && <CompInfoAcademicPeriod handleClose={handleCloseModalInfo} periodoInfo={periodAcademic} />}
      {showModalEdit && <CompEditPeriodAcademic handleClose={handleCloseModalEdit} periodEdit={periodAcademic} />}
    </div>
  );
};

export default CompConsultPeriod;
