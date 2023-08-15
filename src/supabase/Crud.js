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

export const obtenerVotacionById = async (id, modificarVotacionActual) => {
  let result = await supabase.from(SUPABASE_VOTACIONES_COLLECTION).select('*').eq('id', id);
  modificarVotacionActual(result.data[0]);
};

export const obtenerItemsVotacionById = async (id, modificarItemsVotacion) => {
  let result = await supabase.from('items_votaciones').select('*').eq('id_votacion', id);
  modificarItemsVotacion(result.data);
};

export const updateItemVotacion = async(itemVotacion, modificarItemsVotacion) => {
  
  const { data, error } = await supabase
    .from('items_votaciones')
    .update({ votos: itemVotacion.votos , nombre: itemVotacion.nombre }, {nombre: itemVotacion.nombre})
    .eq('id', itemVotacion.id)
    .select();
  console.log(data);
  modificarItemsVotacion(data);
}