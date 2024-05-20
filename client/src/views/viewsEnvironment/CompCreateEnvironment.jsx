import React, { useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';


const CompCreateEnvironment = () => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [ubication, setUbication] = useState('');
    const [environmentType, setEnvironmentType] = useState('presencial'); // Corregido el nombre de la variable
    const [capacity, setCapacity] = useState('');

    const store = async (e) => {
        e.preventDefault();
        // Evitar que el formulario recargue la página
    };

    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={(e)=>store(e)}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="code">Código</label>
                        <input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            type="text"
                            className="form-control"
                            id="code"
                            placeholder="Ingrese el código"
                            required
                            minLength="6"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="name">Nombre</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Ingrese el nombre"
                            required
                            minLength="6"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="ubication">Ubicación</label>
                        <input
                            value={ubication}
                            onChange={(e) => setUbication(e.target.value)}
                            type="text"
                            className="form-control"
                            id="ubication"
                            placeholder="Ingrese la ubicación"
                            required
                            minLength="2"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tipo Ambiente</label>
                        <div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="environmentType"
                                    id="presencial"
                                    value="presencial"
                                    checked={environmentType === "presencial"}
                                    onChange={() => setEnvironmentType("presencial")}
                                />
                                <label className="form-check-label" htmlFor="presencial">Presencial</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="environmentType"
                                    id="virtual"
                                    value="virtual"
                                    checked={environmentType === "virtual"}
                                    onChange={() => setEnvironmentType("virtual")}
                                />
                                <label className="form-check-label" htmlFor="virtual">Virtual</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="capacity">Capacidad</label>
                        <input
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            type="number"
                            className="form-control"
                            id="capacity"
                            placeholder="Ingrese la capacidad"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Crear</button>
                </form>
            </div>
        </div>
    );
}

export default CompCreateEnvironment;
