import React from "react";
import { useNavigate } from "react-router-dom";

function CompHomeCoordinator({ nameCoordinator }) {
    const navigator = useNavigate()

    const goAcademicPeriod = () => {
        navigator('/managementAcademicPeriod');
    }
    const goTeacher = () => {
        navigator('/managementTeacher');
    }
    const goEnvironment = () => {
        navigator('/managementEnvironment');
    }
    const goSchedule = () => {
        navigator('/managementSchedule');
    }
    const logout = () => {
        navigator('/login');
    }

    return (
        <div className="container-fluid p-3">
            <div className="row align-items-center mb-5">
                <div className="col d-flex justify-content-center ms-5">
                    <h2>Bienvenido {nameCoordinator}</h2>
                </div>
                <div className="col-auto ms-auto">
                    <button className="btn btn-outline-secondary" onClick={logout}>Cerrar sesión <i className="bi bi-box-arrow-right" ></i></button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 d-flex flex-column align-items-center " style={{ marginTop: "40px" }}>
                    <h4 className="mb-4">¿Qué desea hacer?</h4>
                    <button className="btn btn-outline-secondary w-100 mb-4" style={{ padding: "1rem 2rem", fontSize: "1.25rem" }}
                    onClick={goAcademicPeriod}>
                        Gestionar Periodos Académicos
                    </button>
                    <button className="btn btn-secondary w-100 mb-4" style={{ padding: "1rem 2rem", fontSize: "1.25rem" }}
                    onClick={goTeacher}>
                        Gestionar Docentes
                    </button>
                    <button className="btn btn-outline-secondary w-100 mb-4" style={{ padding: "1rem 2rem", fontSize: "1.25rem" }}
                    onClick={goEnvironment}>
                        Gestionar Ambientes
                    </button>
                    <button className="btn btn-secondary w-100" style={{ padding: "1rem 2rem", fontSize: "1.25rem" }}
                    onClick={goSchedule}>
                        Gestionar Horarios
                    </button>
                </div>

                <div className="col-md-8 d-flex flex-column align-items-center">
                    <i className="bi bi-person-circle mb-3" style={{ fontSize: "6rem", color: "orange" }}></i>
                    <h4 style={{ fontSize: "1.5rem" }}>Información</h4>
                    <div className="d-flex flex-column align-items-center mb-2">
                        <div className="text-center">
                            <p style={{ fontSize: "1.2rem" }}>Nombre completo: Francisco Javier Obando</p>
                            <p style={{ fontSize: "1.2rem" }}>Cédula: 1009878789</p>
                            <p style={{ fontSize: "1.2rem" }}>Tipo: Profesional</p>
                            <p style={{ fontSize: "1.2rem" }}>Contrato: CNT-Contratista</p>
                            <p style={{ fontSize: "1.2rem" }}>Área: Desarrollo software</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CompHomeCoordinator;
