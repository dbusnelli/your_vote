import { Link } from "react-router-dom";
import { PATH_VOTACION_DETALLE } from "../../utils/constants";

const VotacionCard = (props) => {
  const votacionId = props.votacion.id;
  const votacionTitulo = props.votacion.nombre;
  const votacionDescripcion = props.votacion.descripcion;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h4 className="card-title">{votacionTitulo}</h4>
        <h6 className="card-subtitle mb-2 text-muted">Creado por un usuario</h6>
        <p className="card-text">{votacionDescripcion}</p>
        <Link to={PATH_VOTACION_DETALLE + votacionId} className="card-link">
          Ver Votacion
        </Link>
      </div>
    </div>
  );
};

export default VotacionCard;