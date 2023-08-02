import { supabase } from "./Config";


const votacionesCollection = 'votaciones';
const votacionesItemCollection = 'items_votaciones';

//TODO: AGREGAR REDUX

export const addVotacionOnSupabase = async (votacion) => {

  console.log(votacion)
  const result = await supabase
  .from('votaciones')
  .insert([{
      nombre: votacion.nombre,
      descripcion: votacion.descripcion 
  },])
  .select()
}

export const fetchVotaciones = async () => {
  let result = await supabase.from(votacionesCollection).select('*');
  console.log(result.data)
  
}

export const obtenerItemsVotacionById = async (id) => {
  let result = await supabase.from('items_votaciones').select('*').eq('id_votacion', id);
};

export const eliminarItemVotacionById = async(id) => {
  const { error } = await supabase.from('items_votaciones').delete().eq('id', id);
}

export const updateItemVotacion = async(itemVotacion) => {

  console.log(itemVotacion);
  
  const { data, error } = await supabase
    .from('items_votaciones')
    .update({ votos: itemVotacion.votos , nombre: itemVotacion.nombre }, {nombre: itemVotacion.nombre})
    .eq('id', itemVotacion.id)
    .select();

}