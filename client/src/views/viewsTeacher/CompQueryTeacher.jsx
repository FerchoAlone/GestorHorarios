import React, { useState, useEffect, useContext , useCallback} from "react";
import CompInformationTeacher from "./CompInformationTeacher";
import CompEditTeacher from "./CompEditTeacher";
import axios from "axios";
import { AuthContext } from "../AuthProvider";

function CompQueryTeacher() {
  const { logout } = useContext(AuthContext);
  const [teacherSelected, setTeacherSelected] = useState({});
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;

  const handleShowModalInfo = (teacher) => {
    setTeacherSelected(teacher);
    setShowModalInfo(true);
  };

  const handleCloseModalInfo = () => {
    setShowModalInfo(false);
    setTeacherSelected({});
  };

  const handleShowModalEdit = (teacher) => {
    setTeacherSelected(teacher);
    setShowModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
    setTeacherSelected({});
    getTeachersDB(); // Actualizar la lista de profesores después de editar
  };

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.TEACHER_FIRSTNAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(teacher.TEACHER_ID).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);

  const toggleActiveStatus = async (id, status) => {
    const newStatus = status === "1" ? "0" : "1";
    await changeStateTeacher(id, newStatus);
  };

  const getTeachersDB = useCallback( async () => {
    try {
      const token = localStorage.getItem("token");
      const url = "http://localhost:3001/teacher/getAll";
      const response = await axios.get(url, {
        headers: {
          'Authorization': 'bearer ' + token
        },
      });
      if (response.data.state === "TOKEN") {
        logout();
        return;
      }
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  },[logout]);

  const changeStateTeacher = useCallback(async (id, status) => {
    try{
      const token = localStorage.getItem("token");
      const url = "http://localhost:3001/teacher/changeTeacherStatus";
      const response = await axios.post(url, { id, status }, {
        headers: {
          Authorization: "bearer " + token,
        },
      });
      if (response.data.state === "TOKEN") {
        logout();
        return;
      }
      getTeachersDB(); // Actualizar la lista de profesores después de cambiar el estado
    } catch (error) {
      console.error("Error changing teacher status:", error);
    }
  },[logout, getTeachersDB]);

  useEffect(() => {
    getTeachersDB();
  }, [getTeachersDB]);

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
            {paginatedTeachers.map((teacher) => (
              <tr key={teacher.TEACHER_ID}>
                <td>{teacher.TEACHER_ID}</td>
                <td>{teacher.TEACHER_FIRSTNAME}</td>
                <td>{teacher.TEACHER_TYPE}</td>
                <td className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-link p-0"
                    onClick={() => handleShowModalInfo(teacher)}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="btn btn-link p-0" onClick={() => handleShowModalEdit(teacher)}>
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-link p-0"
                    onClick={() => toggleActiveStatus(teacher.TEACHER_ID, teacher.TEACHER_STATUS)}
                  >
                    {teacher.TEACHER_STATUS === "1" ? (
                      <i className="bi bi-toggle-on"></i>
                    ) : (
                      <i className="bi bi-toggle-off"></i>
                    )}
                  </button>
                  <span>{teacher.TEACHER_STATUS === "1" ? "Activo" : "Inactivo"}</span>
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
                className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {showModalInfo && <CompInformationTeacher handleClose={handleCloseModalInfo} teacher={teacherSelected} />}
      {showModalEdit && <CompEditTeacher handleClose={handleCloseModalEdit} teacher={teacherSelected} />}
    </div>
  );
}

export default CompQueryTeacher;
