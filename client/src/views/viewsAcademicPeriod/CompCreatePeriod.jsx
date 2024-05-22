import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CompCreateAcademicPeriod = () => {
  const [name, setName] = useState('');
  const [datestart, setDateStart] = useState('');
  const [duration, setDuration] = useState(3);
  const [dateend, setDateEnd] = useState('');
  const [success, setSuccess] = useState('');

  const URI = 'http://localhost:3001/academicPeriod/createAcademicPeriod'; // Actualiza con la URI correcta


  useEffect(() => {
    if (datestart) {
      const startDate = new Date(datestart);
      const endDate = new Date(startDate.setMonth(startDate.getMonth() + duration));
      setDateEnd(endDate.toISOString().split('T')[0]);
    }
  }, [datestart, duration]);

  const store = async (e) => {
    e.preventDefault();
      const response = await axios.post(URI, { name, datestart, duration, dateend, status: 1 });
      if (response.data.state === 'SUCCESS') {
        setSuccess(response.data.message);
      } else{
        alert(response.data.message);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={store}>
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
              minLength="5"
              maxLength="15"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="datestart">Fecha Inicio</label>
            <input
              value={datestart}
              onChange={(e) => setDateStart(e.target.value)}
              type="date"
              className="form-control"
              id="datestart"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Duración</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="duration"
                  id="threeMonths"
                  value={3}
                  checked={duration === 3}
                  onChange={() => setDuration(3)}
                  required
                />
                <label className="form-check-label" htmlFor="threeMonths">3 meses</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="duration"
                  id="sixMonths"
                  value={6}
                  checked={duration === 6}
                  onChange={() => setDuration(6)}
                />
                <label className="form-check-label" htmlFor="sixMonths">6 meses</label>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="dateend">Fecha Fin</label>
            <input
              value={dateend}
              type="date"
              className="form-control"
              id="dateend"
              readOnly
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Crear</button>
        </form>
        {success && <div className="alert alert-success mt-3">{success}</div>}
      </div>
    </div>
  );
};

export default CompCreateAcademicPeriod;
