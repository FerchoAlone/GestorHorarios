import React, { useState, useContext, useCallback } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from "../AuthProvider";

import Swal from 'sweetalert2/dist/sweetalert2.js';


const CompCreateEnvironment = (handleClose) => {

    const { logout } = useContext(AuthContext)
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('PRESENCIAL'); // Corregido el nombre de la variable
    const [capacity, setCapacity] = useState('');

    const store = useCallback(async (e) => {
        try {
            const token = localStorage.getItem("token");
            e.preventDefault();
            const response = await axios.post("http://localhost:3001/environment/createEnvironment", { id, name, location, capacity, type, status: 1 }, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            });
            const res = response.data;

            if (res.state === "TOKEN") {
                logout();
                return;
            }
            await Swal.fire({
                text: res.message,
                icon: res.state === "SUCCESS" ? 'success' : 'error',
                timer: 1000,
                showConfirmButton: false
            });
            if (res.state === "SUCCESS") {
                handleClose();
            }
        } catch (error) {
            console.error("Error fetching periods:", error);
        }

    }, [id, name, location, capacity, type, logout, handleClose]);


    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={(e) => store(e)}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="code">Código</label>
                        <input
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            type="text"
                            className="form-control"
                            id="code"
                            placeholder="Ingrese el código"
                            required
                            minLength="6"
                            maxLength="6"
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
                            minLength="3"
                            maxLength="50"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="ubication">Ubicación</label>
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            type="text"
                            className="form-control"
                            id="ubication"
                            placeholder="Ingrese la ubicación"
                            required
                            minLength="2"
                            maxLength="50"
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
                                    checked={type === "PRESENCIAL"}
                                    onChange={() => setType("PRESENCIAL")}
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
                                    checked={type === "VIRTUAL"}
                                    onChange={() => setType("VIRTUAL")}
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
                            max="100"
                            min="1"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Crear</button>
                </form>
            </div>
        </div>
    );
}

export default CompCreateEnvironment;
