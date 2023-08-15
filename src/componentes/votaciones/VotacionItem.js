import { useState } from "react";
import { updateItemVotacion } from "../../supabase/Crud";
//import { updateItemVotacion } from "../../supabase/Crud";

const VotacionItem = (props) => {
  const [id, setId] = useState(props.item.id);
  const [nombre, setNombre] = useState(props.item.nombre);
  const [votos, setVotos] = useState(props.item.votos);

  const [usuarioVoto, setUsuarioVoto] = useState(false);

  const handleMas = () => {
    let newVotos = votos + 1;
    setVotos(newVotos);
    setUsuarioVoto(true);
  };

  const handleGuardarVotos = () => {
    let data = {
      id: id,
      nombre: nombre,
      votos: votos
    }
    setUsuarioVoto(false);
    updateItemVotacion(data);
  }

  return (
    <>
      <li className="list-group-item">
        <p>
          {nombre} | Votos: {votos}
        </p>
        <button type="button" className="btn btn-success" onClick={handleMas}>
          Votar
        </button>
        {usuarioVoto ?
        <button type="button" className="btn btn-primary" onClick={handleGuardarVotos}>
        Guardar Votos
      </button>
        : null}
        
      </li>
    </>
  );
};

export default VotacionItem;
