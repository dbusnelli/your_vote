import { supabase } from "./Config";

const votacionesCollection = 'votaciones';
const votacionesItemCollection = 'items_votaciones';

export const addVotacionOnSupabase = async (votacion) => {
    
}

export const obtenerVotaciones = async () => {
    

  let result = await supabase.from("votaciones").select("*");

  console.log(result);

}

/*export const obtenerItemsVotacionById = async (id) => {
    
}*/

/*export const eliminarItemVotacionById = async(id) => {
    
  }*/