import { Route, Routes } from "react-router-dom";
import Home from "./componentes/Home/Home";
import LoginPage from "./componentes/Login/LoginPage";
import NavBar from "./componentes/navBar/NavBar";
import VotacionesForm from "./componentes/votaciones/VotacionesForm";
import VotacionesList from "./componentes/votaciones/VotacionesList";
import { PATH_BUSQUEDA, PATH_CREAR_VOTACION, PATH_HOME, PATH_LOGIN, PATH_MIS_VOTACIONES } from "./utils/constants";

function App() {

  const homePath = PATH_HOME;
  const loginPath = PATH_LOGIN;
  const crearVotacionPath = PATH_CREAR_VOTACION;
  const misVotacionesPath = PATH_MIS_VOTACIONES;
  const busquedaPath = PATH_BUSQUEDA;

  return (
    <>
      <div className="row">
        <NavBar />
      </div>
      <div className="row p-5">
        <Routes>
          <Route path={homePath} element={<Home/>}/>
          <Route path={misVotacionesPath} element={<VotacionesList misVotaciones={true}/>}/>
          <Route path={busquedaPath} element={<VotacionesList search={true}/>}/>
          <Route path={crearVotacionPath} element={<VotacionesForm/>}/>
          <Route path={loginPath} element={<LoginPage/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;