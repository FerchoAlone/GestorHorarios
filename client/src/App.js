import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompLogin from "./views/CompLogin";
import React from "react";
import "./App.css";

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CompLogin />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
