import { supabase } from "./Config";
import { SUPABASE_VOTACIONES_COLLECTION, SUPABASE_ITEMS_VOTACIONES_COLLECTION} from "../utils/constants";

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

export const obtenerItemsVotacionByIdVotacion = async (idVotacion, modificarItemsVotacion) => {
  let result = await supabase.from(SUPABASE_ITEMS_VOTACIONES_COLLECTION).select('*').eq('id_votacion', idVotacion).order('votos', { ascending: false });
  modificarItemsVotacion(result.data);
};

export const updateItemVotacion = async(itemVotacion, modificarItemsVotacion) => {
  
  const { data, error } = await supabase
    .from(SUPABASE_ITEMS_VOTACIONES_COLLECTION)
    .update({ votos: itemVotacion.votos , nombre: itemVotacion.nombre }, {nombre: itemVotacion.nombre})
    .eq('id', itemVotacion.id)
    .select();

  console.log(data[0])

  let result = await supabase.from(SUPABASE_ITEMS_VOTACIONES_COLLECTION).select('*').eq('id_votacion', data[0].id_votacion).order('votos', { ascending: false });
  modificarItemsVotacion(result.data);
}

export const addItemVotacion = async(itemVotacion, modificarItemsVotacion) => {
  let idVotacion = itemVotacion.idVotacion;
  await supabase
  .from(SUPABASE_ITEMS_VOTACIONES_COLLECTION)
  .insert([
    { id_votacion: idVotacion, nombre: itemVotacion.nombre, votos: 0 },
  ]);

  let result = await supabase.from(SUPABASE_ITEMS_VOTACIONES_COLLECTION).select('*').eq('id_votacion', idVotacion).order('votos', { ascending: false });
  modificarItemsVotacion(result.data);
}