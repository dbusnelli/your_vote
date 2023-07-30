import { db } from "./Config";
import { collection, addDoc , getDocs} from "firebase/firestore";

const votacionesCollection = 'votaciones';
const votacionesItemCollection = 'items_votaciones';

export const addVotacionOnFirebase = async (votacion) => {
    addDoc(collection(db, votacionesCollection), {nombre: votacion.titulo, descripcion: votacion.descripcion})
}

/*obtenerVotaciones = async () => {
    let votacionesData = [];
    const querySnapshot = await getDocs(collection(db,votacionesCollection));
    querySnapshot.forEach( doc => {
        votacionesData = [...votacionesData, doc.data()]
    })

}*/