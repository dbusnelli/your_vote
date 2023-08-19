import VotacionItem from "./VotacionItem";
import { useDispatch, useSelector } from "react-redux";
import { setVotacionActual, modifyItemsVotaciones } from "../../redux/reducers/votaciones";
import { useEffect, useState } from "react";
import { getVotosDisponiblesParaVotacion, obtenerItemsVotacionByIdVotacion, obtenerVotacionById } from "../../supabase/Crud";
import { useParams } from "react-router";
import VotacionItemModalAgregar from "./VotacionItemModalAgregar";
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from "react-toastify";

const Votacion = () => {
  const dispatch = useDispatch();
  const votacion = useSelector((state) => state.votaciones.votacionActual);
  const itemsVotacion = useSelector((state) => state.votaciones.items_votaciones);
  const {id} = useParams();
  const [show, setShow] = useState(false);
  const [votosDisponibles, setVotosDisponibles] = useState(0);
  const usuario = useSelector((state) => state.usuario.usuario);
  const win = window.sessionStorage;

  useEffect(() => {
    getDatosParaVotacion();
  }, []);

  const getDatosParaVotacion = async() => {
    await obtenerVotacionById(id, modificarVotacionActual);
    await obtenerItemsVotacionByIdVotacion(id, modificarItemsVotacion);
  }

  const modificarVotacionActual = async(data) => {
    dispatch(setVotacionActual(data));
    if(win.getItem('userName')){
      await getVotosDisponiblesParaVotacion(win.getItem('userName'), id, setCantVotosDisponibles);
    }
    
  };

  const modificarItemsVotacion = (data) => {
    dispatch(modifyItemsVotaciones (data));
  }

  const setCantVotosDisponibles = (data) => {
    setVotosDisponibles(data);
  }

  const onAgregarVoto = () => {
    setVotosDisponibles(votosDisponibles-1);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const onSuccess = () => {
    toast.success('Item agregado!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }); 
  }

  return (
    <>
      <p className="h3"> {votacion ? votacion.nombre : null}</p>
      <p className="h5"> {votacion ? votacion.descripcion : null}</p>
      {usuario ? 
      <p className="h4">
        Tiene {votosDisponibles} {votosDisponibles == 1 ? "voto" : "votos"}{" "}
        disponibles.
      </p>
      :<p className="h4 text-warning">
        Para poder votar o agregar Items necesita estar logueado
      </p>}
      {itemsVotacion.length > 0 ? (
        <div className="w-75 mt-3">
          <ul className="list-group list-group-flush">
            {itemsVotacion.map((item) => (
              <div key={item.id}>
                <VotacionItem
                  item={item}
                  modificarItemsVotacion={modificarItemsVotacion}
                  onAgregarVoto={onAgregarVoto}
                  sinVotos={votosDisponibles == 0}
                  idVotacion={id}
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
      {usuario ? (
        <div className="row justify-content-center">
          <button
            className="btn btn-primary w-25 ms-3 mt-5"
            onClick={handleShow}
          >
            Agregar un Item
          </button>
        </div>
      ) : null}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Item a Agregar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VotacionItemModalAgregar
            handleClose={handleClose}
            modificarItemsVotacion={modificarItemsVotacion}
            id={id}
            onSuccess={onSuccess}
          />
        </Modal.Body>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Votacion;
