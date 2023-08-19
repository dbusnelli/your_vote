import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCantVotosByUsuario, updateItemVotacion } from "../../supabase/Crud";

const VotacionItem = (props) => {
  const [id, setId] = useState(props.item.id);
  const votacionActual = useSelector((state) => state.votaciones.votacionActual);
  const [nombre, setNombre] = useState(props.item.nombre);
  const [votos, setVotos] = useState(props.item.votos);
  const [showModalConfirmVoto, setShowModalConfirmVoto] = useState(false);
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuario.usuario);

  const handleVotar = () => {
    let newVotos = votos + 1;
    setVotos(newVotos);
    handleCloseModalConfirmVoto();
    props.onAgregarVoto();
    let data = {
      id: id,
      nombre: nombre,
      votos: newVotos
    }
    updateItemVotacion(data, props.modificarItemsVotacion);
    data = {
      id_votacion: votacionActual.id,
      usuario: usuario.nombre
    }
    updateCantVotosByUsuario(data);
  };

  const handleCloseModalConfirmVoto = () => setShowModalConfirmVoto(false);
  const handleShowModalConfirmVoto = () => setShowModalConfirmVoto(true);

  return (
    <>
      <li className="list-group-item">
        <p>
          {nombre} | Votos: {votos}
        </p>
        {!props.sinVotos && usuario ?
        <button type="button" className="btn btn-success" onClick={handleShowModalConfirmVoto}>
          Votar
        </button>
        : null}
        
      </li>

      <Modal show={showModalConfirmVoto} onHide={handleCloseModalConfirmVoto}>
        <Modal.Header closeButton>
          <Modal.Title>Votar por Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Seguro que desea votar por el Item: <span className = "text-info">{nombre}</span>?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary w-25" onClick={handleVotar}>
            Si, por favor
          </button>
          <button
            className="btn btn-secondary w-25"
            onClick={handleCloseModalConfirmVoto}
          >
            No
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VotacionItem;
