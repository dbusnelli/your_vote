import VotacionItem from "./VotacionItem";
import { db } from "../../firebase/Config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const Votacion = (props) => {
  const [id, setId] = useState(props.votacion.id);
  const [nombre, setNombre] = useState(props.votacion.nombre);
  const [descripcion, setDescripcion] = useState(props.votacion.descripcion);
  const [itemsVotacion, setItemsVotacion] = useState([]);

  useEffect(() => {
    obtenerItemsVotacionById();
  }, []);

  const obtenerItemsVotacionById = async () => {
    let votacionesItemCollection = "items_votaciones";
    const q = query(
      collection(db, votacionesItemCollection),
      where("id_votacion", "==", id)
    );

    let newData = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      newData.push({ ...doc.data(), id: doc.id });
    });
    setItemsVotacion(newData);
  };

  return (
    <>
      <p class="h3"> - {nombre}</p>
      <p class="h5"> {descripcion}</p>
      <div class="card">
        <ul class="list-group list-group-flush">
          {itemsVotacion.map((item) => (
            <div key={item.id}>
            <VotacionItem item={item} />
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Votacion;
