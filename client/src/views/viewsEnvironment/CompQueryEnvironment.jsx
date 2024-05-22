import React, { useEffect, useState } from "react";
import CompEditEnvironment from "./CompEditEnvironment";
import CompInfoEnviorement from "./CompInfoEnviorement";
import axios from "axios";

function CompQueryEnvironment() {
  const [environmentSelected, setEnvironmentSelected] = useState({});
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const handleShowModalInfo = (environment) => {
    setShowModalInfo(true);
    setEnvironmentSelected(environment);
  };
  const handleCloseModalInfo = () => {
    setShowModalInfo(false);
    setEnvironmentSelected(null);
  };
  const handleShowModalEdit = (environment) => {
    setShowModalEdit(true);
    setEnvironmentSelected(environment);
  };
  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
    setEnvironmentSelected(null);
    getEnvironmentsDB();
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [environments, setEnvironments] = useState([]);

  const itemsPerPage = 7;
  const filteredEnvironments = environments.filter(
    (environment) =>
      environment.ENVIRONMENT_NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
      environment.ENVIRONMENT_ID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedTeachers = filteredEnvironments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredEnvironments.length / itemsPerPage);

  const toggleActiveStatus =async (id,status) => {

    if(status==="1"){
      await changeStateEnvironment(id,"0");
    }else{
      await changeStateEnvironment(id,"1");
    }
    
  };

  const getEnvironmentsDB = async () => {
    const url="http://localhost:3001/environment/getAll";
    const response = await axios.get(url);
    setEnvironments(response.data);
  };

  const changeStateEnvironment = async (id, status) => {
    const url="http://localhost:3001/environment/changeStateEnvironment";
    const response = await axios.post(url, { id, status });
    if (response.data.state === "SUCCESS") {
      getEnvironmentsDB();
    } else {
      alert(response.data.message);
    }
  
  }

  useEffect(() => {
    getEnvironmentsDB();
  }, []); 

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
              <tr key={environment.ENVIRONMENT_ID}>
                <td>{environment.ENVIRONMENT_ID}</td>
                <td>{environment.ENVIRONMENT_NAME}</td>
                <td>{environment.ENVIRONMENT_LOCATION}</td>
                <td className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-link p-0"
                    onClick={() => handleShowModalInfo(environment)}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <button
                    className="btn btn-link p-0"
                    onClick={() => handleShowModalEdit(environment)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-link p-0"
                    onClick={() => toggleActiveStatus(environment.ENVIRONMENT_ID, environment.ENVIRONMENT_STATUS)}
                  >
                    {environment.ENVIRONMENT_STATUS==="1" ? (
                      <i className="bi bi-toggle-on"></i>
                    ) : (
                      <i className="bi bi-toggle-off"></i>
                    )}
                  </button>
                  <span>{environment.ENVIRONMENT_STATUS==="1" ? "Activo" : "Inactivo"}</span>
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
      {showModalInfo && <CompInfoEnviorement handleClose={handleCloseModalInfo} environment={environmentSelected} />}
      {showModalEdit && <CompEditEnvironment handleClose={handleCloseModalEdit} environment={environmentSelected} />}
    </div>
  );
}

export default CompQueryEnvironment;
