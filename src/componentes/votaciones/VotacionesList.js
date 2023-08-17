import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { modifyVotaciones } from "../../redux/reducers/votaciones";
import { fetchVotaciones, fetchVotacionesByUsername } from "../../supabase/Crud";
import { CHEQUEA_ESTAS_VOTACIONES, CREA_TU_PRIMERA_VOTACION, PATH_CREAR_VOTACION, PATH_HOME, RESULTADO_BUSQUEDA, SE_EL_PRIMERO, SIN_RESULTADOS, SIN_VOTACIONES_USUARIO, SUS_VOTACIONES } from "../../utils/constants";
import VotacionCard from "./VotacionCard";

const VotacionesList = (props) => {
  const votaciones = useSelector((state) => state.votaciones.votaciones);
  const usuario = useSelector((state) => state.usuario.usuario)
  const dispatch = useDispatch();
  const misVotaciones = props.misVotaciones;
  const search = props.search;
  const navigate = useNavigate();
  const win = window.sessionStorage;

  const mensajeVotacionesResult = misVotaciones ? SUS_VOTACIONES : search ? RESULTADO_BUSQUEDA : CHEQUEA_ESTAS_VOTACIONES;
  const mensajeVotacionesNull = misVotaciones ? SIN_VOTACIONES_USUARIO : search ? SIN_RESULTADOS : null;
  const postScriptVotacionesNull = misVotaciones ? CREA_TU_PRIMERA_VOTACION : search ? SE_EL_PRIMERO : null;
  const pathOfButton = PATH_CREAR_VOTACION;

  useEffect(() => {
    if(misVotaciones && win.getItem('userName')){
      fetchVotacionesByUsername(win.getItem('userName'), modificarVotaciones);
    }else if(!misVotaciones){
      fetchVotaciones(modificarVotaciones);
    }else{
      navigate(PATH_HOME);
    }
  }, []);

  const modificarVotaciones = (data) => {
    dispatch(modifyVotaciones(data));
  };

  const handleCrearVotacionClick = () => {
    navigate(pathOfButton)
  }

  return (
    <>
      <p className="h2 mb-3">{mensajeVotacionesResult}</p>
      {votaciones.length > 0 ? (
        <div className="col-md-8">
          {votaciones.map((votacion) => (
            <div key={votacion.id}>{<VotacionCard votacion={votacion} />}</div>
          ))}
        </div>
      ) : (
        <>
          <p className="h4">{mensajeVotacionesNull}</p>
          <div className="row justify-content-center">
            <figure className="text-center">
              <hr className="hr" />
              <p className="h4">{postScriptVotacionesNull}</p>
            </figure>

            <button type="button" className="btn btn-primary w-25" onClick={handleCrearVotacionClick}>
              Crear Votacion
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default VotacionesList;
