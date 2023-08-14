import { Route, Routes } from "react-router-dom";
import Home from "./componentes/Home/Home";
import LoginPage from "./componentes/Login/LoginPage";
import NavBar from "./componentes/navBar/NavBar";
import VotacionesForm from "./componentes/votaciones/VotacionesForm";

function App() {
  return (
    <>
      <div className="row">
        <NavBar />
      </div>
      <div className="row p-5">
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/crearVotacion"} element={<VotacionesForm/>}/>
          <Route path={"/login"} element={<LoginPage/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;