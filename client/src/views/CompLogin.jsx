import { useState,useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'

function CompLogin() {
  const [user, setUser ] = useState('');
  const [ password, setPassword ] = useState('');
  const {login} = useContext(AuthContext);
  const navigator=useNavigate();
  const sendLogin = async(e)=>{
    //TODO: HACER VALIDACIONES DE CAMPOS
    e.preventDefault();
    const res= await login(user, password);
    await Swal.fire({
        text: res.message,
        icon: res.status?'success':'error',
        timer:750,
        showConfirmButton:false
      });
    if(res.status){
      if(res.rol==="COORDINADOR"){
        navigator('/management')
      }else{
        navigator('/teacherSchedule')
      }
      
    }
  }
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div>
        <h2 className="text-center">Iniciar sesión</h2>
        <form onSubmit={sendLogin} className="form" method="post">
          <div className="mb-3">
            <label htmlFor="text" className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              id="usuario"
              placeholder="Ingrese su usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              name="username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Iniciar sesión</button>
          </div>
        </form>
      </div>
    </div>
  );
  
}

export default CompLogin;
