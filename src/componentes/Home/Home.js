import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifyVotaciones } from "../../redux/reducers/votaciones";
import { fetchVotaciones } from "../../supabase/Crud";
import Votacion from "../votaciones/Votacion";

const Home = () => {
  const votaciones = useSelector((state) => state.votaciones.votaciones);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchVotaciones(modificarVotaciones);
  }, []);

  const modificarVotaciones = (data) => {
    dispatch(modifyVotaciones(data));
  }

  return (
    <>
      <p class="h2">Sus Votaciones</p>
      {votaciones.length > 0 ? (
        <div className="col-md-8">
          {votaciones.map((votacion) => (
            <div key={votacion.id}>{<Votacion votacion={votacion} />}</div>
          ))}
        </div>
      ) : (
        <p class="h4">No tiene votaciones aun</p>
      )}
    </>
  );
};

export default Home;
