import { supabase } from "./Config";
import { SUPABASE_VOTACIONES_COLLECTION } from "../utils/constants";

export const fetchVotaciones = async (modificarVotaciones) => {
  let result = await supabase.from(SUPABASE_VOTACIONES_COLLECTION).select("*");
  modificarVotaciones(result.data);
};

export const addVotacionOnSupabase = async (votacion) => {

  await supabase
  .from(SUPABASE_VOTACIONES_COLLECTION)
  .insert([{
      nombre: votacion.nombre,
      descripcion: votacion.descripcion 
  },])
  
}