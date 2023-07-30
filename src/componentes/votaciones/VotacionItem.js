import { useState } from "react";

const VotacionItem = (props) => {
  const [id, setId] = useState(props.item.id);
  const [titulo, setNombre] = useState(props.item.titulo);
  const [votos, setVotos] = useState(props.item.votos);

  return (
    <>
      <li class="list-group-item">
        <p>{titulo} | Votos: {votos}</p>
      </li>
    </>
  );
};

export default VotacionItem;
