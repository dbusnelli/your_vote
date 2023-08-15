import VotacionItem from "./VotacionItem";
import { useDispatch, useSelector } from "react-redux";
import { setVotacionActual, modifyItemsVotaciones } from "../../redux/reducers/votaciones";
import { useEffect, useState } from "react";
import { obtenerItemsVotacionById, obtenerVotacionById } from "../../supabase/Crud";
import { useParams } from "react-router";
//import {eliminarItemVotacionById} from "../../supabase/Crud"

const Votacion = () => {
  const votacion = useSelector((state) => state.votaciones.votacionActual);
  const itemsVotacion = useSelector((state) => state.votaciones.items_votaciones);
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    obtenerVotacionById(id, modificarVotacionActual);
    obtenerItemsVotacionById(id, modificarItemsVotacion);
  }, []);

  const modificarVotacionActual = (data) => {
    dispatch(setVotacionActual(data));
  };

  const modificarItemsVotacion = (data) => {
    dispatch(modifyItemsVotaciones (data));
  }

  return (
    <>
      <p className="h3"> {votacion ? votacion.nombre : null}</p>
      <p className="h5"> {votacion ? votacion.descripcion : null}</p>
      {itemsVotacion.length > 0 ? (

      <div>
        <ul className="list-group list-group-flush">
          {itemsVotacion.map((item) => (
            <div key={item.id}>
            <VotacionItem item={item} modificarItemsVotacion={modificarItemsVotacion}/>
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

    </>
  );
};

export default Votacion;
