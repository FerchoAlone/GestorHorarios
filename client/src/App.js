import { BrowserRouter, Route, Routes,Navigate  } from "react-router-dom";
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
import CompCreateEnvironment from "./views/viewsEnvironment/CompCreateEnvironment";
import CompQueryEnvironment from "./views/viewsEnvironment/CompQueryEnvironment";
import NotFound from "./views/NotFound";
import CompScheduleCoor from "./views/viewsSchedule/CompScheduleCoor";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<CompLogin />}></Route>
          <Route path="/management" element={<CompHomeCoordinator/>}></Route>
          <Route path="/managementTeacher" element={<Management name="Docente" compCreate={<CompCreateTeacher/>} compQuery={<CompQueryTeacher/>} />}></Route>
          <Route path="/managementEnvironment" element={<Management name="Ambiente" compCreate={<CompCreateEnvironment/>} compQuery={<CompQueryEnvironment/>} />}></Route>
          <Route path="/managementAcademicPeriod" element={<Management name="Periodo academico" compCreate={<CompCreatePeriod/>} compQuery={<CompConsultPeriod/>} />}></Route>
          <Route path="/managementSchedule" element={<CompScheduleCoor/>}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
