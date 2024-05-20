import React, { useState } from "react";
import CompInfoAcademicPeriod from "./CompInfoAcademicPeriod";
import CompEditPeriodAcademic from "./CompEditPeriodAcademic";

const CompConsultPeriod = () => {
  const [idSelected, setIdSelected] = useState(null);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const handleShowModalInfo = (id) => {
    setShowModalInfo(true);
    setIdSelected(id);
  };
  const handleCloseModalInfo = () => {
    setShowModalInfo(false);
    setIdSelected(null);
  };
  const handleShowModalEdit = (id) => {
    setShowModalEdit(true);
    setIdSelected(id);
  };
  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
    setIdSelected(null);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [periods, setPeriods] = useState([
    { id: "00001", name: "2024-1", date:"date",active: true },
    { id: "00002", name: "2023-2", date:"date",active: true },
    { id: "00003", name: "2024-2", date:"date",active: true },
    // Add more period objects here
  ]);

  const itemsPerPage = 3;
  const filteredPeriods = periods.filter(
    (period) =>
      period.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      period.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedPeriods = filteredPeriods.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredPeriods.length / itemsPerPage);

  const toggleActiveStatus = (id) => {
    setPeriods((prevPeriods) =>
      prevPeriods.map((period) =>
        period.id === id ? { ...period, active: !period.active } : period
      )
    );
  };

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
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPeriods.map((period) => (
              <tr key={period.id}>
                <td>{period.id}</td>
                <td>{period.name}</td>
                <td>{period.date}</td>
                <td className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-link p-0"
                    onClick={() => handleShowModalInfo(period.id)}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <button
                    className="btn btn-link p-0"
                    onClick={() => handleShowModalEdit(period.id)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-link p-0"
                    onClick={() => toggleActiveStatus(period.id)}
                  >
                    {period.active ? (
                      <i className="bi bi-toggle-on"></i>
                    ) : (
                      <i className="bi bi-toggle-off"></i>
                    )}
                  </button>
                  <span>{period.active ? "Activo" : "Inactivo"}</span>
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
                className={`page-item ${
                  index + 1 === currentPage ? "active" : ""
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
      {showModalInfo && <CompInfoAcademicPeriod handleClose={handleCloseModalInfo} id={idSelected} />}
      {showModalEdit && <CompEditPeriodAcademic handleClose={handleCloseModalEdit} id={idSelected} />}
    </div>
  );
};

export default CompConsultPeriod;
