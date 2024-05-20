import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompLogin from "./views/CompLogin";
import { React } from "react";
import "./App.css";
import Management from "./views/Management";
import CompHomeCoordinator from "./views/CompHomeCoordinator";
import CompCreateTeacher from "./views/viewsTeacher/CompCreateTeacher";
import CompQueryTeacher from "./views/viewsTeacher/CompQueryTeacher";
import CompCreatePeriod from "./views/viewsAcademicPeriod/CompCreatePeriod";
import CompConsultPeriod from "./views/viewsAcademicPeriod/CompConsultPeriod";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<CompLogin />}></Route>
          <Route path="/management" element={<CompHomeCoordinator/>}></Route>
          <Route path="/managementTeacher" element={<Management name="Docente" compCreate={<CompCreateTeacher/>} compQuery={<CompQueryTeacher/>} />}></Route>
          <Route path="/managementEnvironment" element={<Management name="Ambiente" compCreate={<h2>CREAR DOCENTE</h2>} compQuery={<h2>CONSULTAR DOCENTE</h2>} />}></Route>
          <Route path="/managementAcademicPeriod" element={<Management name="Periodo academico" compCreate={<CompCreatePeriod/>} compQuery={<CompConsultPeriod/>} />}></Route>
          <Route path="/managementSchedule" element={<h2>Schedule</h2>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
