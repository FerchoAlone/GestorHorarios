import React, { useState } from 'react';

function Management({name, compCreate, compQuery}) {
    const [isShowCreate, setisShowCreate]= useState(false);
    const[isShowQuery, setisShowQuery]=useState(true);
    const showCreate = () => {
        setisShowCreate(true);
        setisShowQuery(false);
    }
    const showQuery=()=>{
        setisShowCreate(false);
        setisShowQuery(true);
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-3 d-none d-md-block sidebar">
                    <div className="sidebar-sticky p-4">
                        <ul className="nav fs-4">
                            <li className="nav-item d-flex align-items-center">
                                <a className="nav-link ms-4" href="/management">
                                    <i className="fa-solid fa-house fs-1"></i>
                                </a>
                                <div className="dropdown ml-2">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        ¿Qué desea hacer?
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="/managementAcademicPeriod">Gestionar Periodo Academico</a>
                                        <a className="dropdown-item" href="/managementTeacher">Gestionar Docente</a>
                                        <a className="dropdown-item" href="/managementEnvironment">Gestionar Ambiente</a>
                                        <a className="dropdown-item" href="/managementSchedule">Gestionar Horarios</a>
                                    </div>
                                </div>

                            </li>

                        </ul>
                    </div>
                </nav>

                <div className="col-md-9 p-4 mt-2">
                    <h1 className="h2 text-center fw-bold" >Gestionar {name}</h1>
                </div>
            </div>

            <div className='row'>
                <div className="col-md-3 p-2 h-200 d-inline-block border-end border-dark " style={{ height: "70vh" }}>
                    <div className="nav-link p-4 fs-5" onClick={showCreate} style={{ cursor: "pointer" }} >
                        <i className="fas fa-plus" ></i> Crear {name}
                    </div>
                    <div className="nav-link p-4 fs-5" onClick={showQuery}  style={{ cursor: "pointer" }}>
                        <i className="fas fa-search"></i> Consultar {name}
                    </div>
                </div>
                <div className='col-md-1'></div>
                <div className='col-md-7'>
                    {isShowCreate? compCreate: <></>}
                    {isShowQuery? compQuery: <></>}
                </div>
                <div className='col-md-1'></div>
            </div>
        </div>

    );
}

export default Management;

