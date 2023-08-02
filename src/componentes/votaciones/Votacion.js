import VotacionItem from "./VotacionItem";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase/Config";
//import {eliminarItemVotacionById} from "../../supabase/Crud"

const Votacion = (props) => {
  const [id, setId] = useState(props.votacion.id);
  const [nombre, setNombre] = useState(props.votacion.nombre);
  const [descripcion, setDescripcion] = useState(props.votacion.descripcion);
  const [itemsVotacion, setItemsVotacion] = useState([]);

  useEffect(() => {
    obtenerItemsVotacionById();
  }, []);

  const obtenerItemsVotacionById = async () => {
    let result = await supabase.from('items_votaciones').select('*').eq('id_votacion', id);
    
    setItemsVotacion(result.data); 
  };

  const eliminarItem = (id) => {
    if(window.confirm("Estas seguro que deseas eliminar el Item de la votacion?")){
        const newItemsVotacion = itemsVotacion.filter((item) => item.id !== id);
        setItemsVotacion(newItemsVotacion);
        //eliminarItemVotacionById(id);
    }
  }

  return (
    <>
      <p class="h3"> - {nombre}</p>
      <p class="h5"> {descripcion}</p>
      <div class="card">
        <ul class="list-group list-group-flush">
          {itemsVotacion.map((item) => (
            <div key={item.id}>
            <VotacionItem item={item} />
            <button type="button" class="btn btn-danger" onClick={() => eliminarItem(item.id)}>Eliminar</button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Votacion;
