import VotacionItem from "./VotacionItem";
import { useDispatch, useSelector } from "react-redux";
import { setVotacionActual, modifyItemsVotaciones } from "../../redux/reducers/votaciones";
import { useEffect, useState } from "react";
import { obtenerItemsVotacionByIdVotacion, obtenerVotacionById } from "../../supabase/Crud";
import { useParams } from "react-router";
import VotacionItemModalAgregar from "./VotacionItemModalAgregar";
import Modal from 'react-bootstrap/Modal';

const Votacion = () => {
  const dispatch = useDispatch();
  const votacion = useSelector((state) => state.votaciones.votacionActual);
  const itemsVotacion = useSelector((state) => state.votaciones.items_votaciones);
  const {id} = useParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    obtenerVotacionById(id, modificarVotacionActual);
    obtenerItemsVotacionByIdVotacion(id, modificarItemsVotacion);
  }, []);

  const modificarVotacionActual = (data) => {
    dispatch(setVotacionActual(data));
  };

  const modificarItemsVotacion = (data) => {
    dispatch(modifyItemsVotaciones (data));
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p className="h3"> {votacion ? votacion.nombre : null}</p>
      <p className="h5"> {votacion ? votacion.descripcion : null}</p>
      {itemsVotacion.length > 0 ? (
        <div>
          <ul className="list-group list-group-flush">
            {itemsVotacion.map((item) => (
              <div key={item.id}>
                <VotacionItem
                  item={item}
                  modificarItemsVotacion={modificarItemsVotacion}
                />
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <div className="row justify-content-center">
          <figure className="text-center">
            <hr className="hr" />
            <p className="h4">No hay Items en esta votacion</p>
          </figure>
        </div>
      )}
      <div className="row justify-content-center">
        <button
          className="btn btn-primary w-25 ms-3 mt-5"
          onClick={handleShow}
        >
          Agregar un Item
        </button>
      </div>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Item a Agregar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VotacionItemModalAgregar handleClose={handleClose} modificarItemsVotacion={modificarItemsVotacion} id={id}/>
        </Modal.Body>   
      </Modal>
    </>
      

  );
};

export default Votacion;
