import { modifyVotaciones } from "../redux/reducers/votaciones";
import { useDispatch } from 'react-redux';
import { supabase } from "./Config";

const votacionesCollection = 'votaciones';
const votacionesItemCollection = 'items_votaciones';
const dispatch = useDispatch();

//TODO: AGREGAR REDUX

const addVotacionOnSupabase = async (votacion) => {

  const result = await supabase
  .from('votaciones')
  .insert([{
      nombre: votacion.nombre,
      descripcion: votacion.descripcion 
  },])
  .select()
}

const fetchVotaciones = async () => {
  let result = await supabase.from(votacionesCollection).select('*');
  console.log(result.data)
  dispatch(modifyVotaciones(result.data));
}

const obtenerItemsVotacionById = async (id) => {
  let result = await supabase.from('items_votaciones').select('*').eq('id_votacion', id);
};

const eliminarItemVotacionById = async(id) => {
  const { error } = await supabase.from('items_votaciones').delete().eq('id', id);
}

const updateItemVotacion = async(itemVotacion) => {
  
  const { data, error } = await supabase
    .from('items_votaciones')
    .update({ votos: itemVotacion.votos , nombre: itemVotacion.nombre }, {nombre: itemVotacion.nombre})
    .eq('id', itemVotacion.id)
    .select();

}

export default Crud;

