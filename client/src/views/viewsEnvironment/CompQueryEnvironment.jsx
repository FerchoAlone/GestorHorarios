import React, { useState } from "react";
import CompEditEnvironment from "./CompEditEnvironment";
import CompInfoEnviorement from "./CompInfoEnviorement";
//import CompInformationTeacher from "./CompInformationTeacher";
//import CompEditTeacher from "./CompEditTeacher";

function CompQueryEnvironment() {
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
  const [environments, setEnvironments] = useState([
    {
      id: "AAA001",
      name: "Salon 105",
      location: "FIET",
      active: true,
    },
    {
      id: "AAA002",
      name: "Salon 230",
      location: "FIET",
      active: true,
    },
    {
      id: "AAA003",
      name: "Salon 231",
      location: "FIET",
      active: false,
    },
  ]);

  const itemsPerPage = 3;
  const filteredTeachers = environments.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);

  const toggleActiveStatus = (id) => {
    setEnvironments((prevTeachers) =>
      prevTeachers.map((teacher) =>
        teacher.id === id ? { ...teacher, active: !teacher.active } : teacher
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
              <th>Ubicacion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTeachers.map((environment) => (
              <tr key={environment.id}>
                <td>{environment.id}</td>
                <td>{environment.name}</td>
                <td>{environment.location}</td>
                <td className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-link p-0"
                    onClick={() => handleShowModalInfo(environment.id)}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <button
                    className="btn btn-link p-0"
                    onClick={() => handleShowModalEdit(environment.id)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-link p-0"
                    onClick={() => toggleActiveStatus(environment.id)}
                  >
                    {environment.active ? (
                      <i className="bi bi-toggle-on"></i>
                    ) : (
                      <i className="bi bi-toggle-off"></i>
                    )}
                  </button>
                  <span>{environment.active ? "Activo" : "Inactivo"}</span>
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
      {showModalInfo && <CompInfoEnviorement handleClose={handleCloseModalInfo} id={idSelected} />}
      {showModalEdit && <CompEditEnvironment handleClose={handleCloseModalEdit} id={idSelected} />}
    </div>
  );
}

export default CompQueryEnvironment;
