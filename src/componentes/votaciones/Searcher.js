import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { modifyVotaciones } from "../../redux/reducers/votaciones";
import { fetchVotacionesByFiltro } from "../../supabase/Crud";
import { PATH_BUSQUEDA } from "../../utils/constants";

const Searcher = () => {
  const [filtro, setFiltro] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBusqueda = () => {
    if(filtro && filtro != ""){
      fetchVotacionesByFiltro(filtro, modificarVotaciones)
      navigate (PATH_BUSQUEDA + filtro);
    }
  }

  const modificarVotaciones = (data) => {
    dispatch(modifyVotaciones(data));
  };

  return (
    <div className="container-fluid input-group mb-3">
      <input
        className="form-control"
        type="search"
        placeholder="Buscar Votacion"
        aria-label="Search"
        value = {filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <button className="btn btn-outline-success me-3" type="submit" onClick={handleBusqueda}>
        Buscar
      </button>
    </div>
  );
};

export default Searcher;
