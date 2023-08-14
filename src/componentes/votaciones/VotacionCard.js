import { Link } from "react-router-dom";
import { PATH_VOTACION_DETALLE } from "../../utils/constants";

const VotacionCard = (props) => {
  const votacionId = props.votacion.id;
  const votacionTitulo = props.votacion.nombre;
  const votacionDescripcion = props.votacion.descripcion;

  return (
    <div class="card mb-3">
      <div class="card-body">
        <h4 class="card-title">{votacionTitulo}</h4>
        <h6 class="card-subtitle mb-2 text-muted">Creado por un usuario</h6>
        <p class="card-text">{votacionDescripcion}</p>
        <Link to={PATH_VOTACION_DETALLE + votacionId} class="card-link">
          Ver Votacion
        </Link>
      </div>
    </div>
  );
};

export default VotacionCard;