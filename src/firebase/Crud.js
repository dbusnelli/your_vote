import { db } from "./Config";
import { collection, addDoc , getDocs, query, where} from "firebase/firestore";

const votacionesCollection = 'votaciones';
const votacionesItemCollection = 'items_votaciones';

export const addVotacionOnFirebase = async (votacion) => {
    addDoc(collection(db, votacionesCollection), {nombre: votacion.titulo, descripcion: votacion.descripcion})
}

/*export const obtenerVotaciones = async () => {
    let votacionesData = [];
    const querySnapshot = await getDocs(collection(db,votacionesCollection));
    querySnapshot.forEach( doc => {
        votacionesData = [...votacionesData, doc.data()]
    })

}*/

/*export const obtenerItemsVotacionById = async (id) => {
    const q = query(
      collection(db, votacionesItemCollection),
      where("id_votacion", "==", id)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
}*/