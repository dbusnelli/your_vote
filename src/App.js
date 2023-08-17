import { Route, Routes } from "react-router-dom";
import Home from "./componentes/Home/Home";
import LoginPage from "./componentes/Login/LoginPage";
import RecuperarPassword from "./componentes/Login/RecuperarPassword";
import SignInPage from "./componentes/Login/SignInPage";
import NavBar from "./componentes/navBar/NavBar";
import Votacion from "./componentes/votaciones/VotacionDetalle";
import VotacionesForm from "./componentes/votaciones/VotacionesForm";
import VotacionesList from "./componentes/votaciones/VotacionesList";
import { FINAL_PATH_VOTACION_DETALLE, PATH_BUSQUEDA, PATH_CREAR_VOTACION, PATH_HOME, PATH_LOGIN, PATH_MIS_VOTACIONES, PATH_RECUPERAR_PASS, PATH_SIGNIN, PATH_VOTACION_DETALLE } from "./utils/constants";

function App() {

  const homePath = PATH_HOME;
  const loginPath = PATH_LOGIN;
  const crearVotacionPath = PATH_CREAR_VOTACION;
  const misVotacionesPath = PATH_MIS_VOTACIONES;
  const busquedaPath = PATH_BUSQUEDA;
  const votacionDetallePath = FINAL_PATH_VOTACION_DETALLE;
  const signInPath = PATH_SIGNIN;
  const recuperarPassPath = PATH_RECUPERAR_PASS;

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
          <Route path={votacionDetallePath} element={<Votacion/>}/>
          <Route path={crearVotacionPath} element={<VotacionesForm/>}/>
          <Route path={loginPath} element={<LoginPage/>}/>
          <Route path={signInPath} element={<SignInPage/>}/>
          <Route path={recuperarPassPath} element={<RecuperarPassword/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;