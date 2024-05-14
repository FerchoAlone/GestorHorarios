import { useState } from "react";

function CompLogin() {
  const [mail, setMail ] = useState('');
  const [ password, setPassword ] = useState('');

  const login =async (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={login} className="form">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Ingrese su correo electrónico"
            value={mail}
            onChange={(e)=>setMail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default CompLogin;
