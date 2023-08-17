import { supabase } from "./Config";
import { SUPABASE_VOTACIONES_COLLECTION, SUPABASE_ITEMS_VOTACIONES_COLLECTION, SUPABASE_USUARIOS_COLLECTION} from "../utils/constants";

export const fetchVotaciones = async (modificarVotaciones) => {
  let result = await supabase.from(SUPABASE_VOTACIONES_COLLECTION).select("*").order('created_at', { ascending: false });
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
  
  const { data } = await supabase
    .from(SUPABASE_ITEMS_VOTACIONES_COLLECTION)
    .update({ votos: itemVotacion.votos , nombre: itemVotacion.nombre }, {nombre: itemVotacion.nombre})
    .eq('id', itemVotacion.id)
    .select();

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

export const existeNombreUsuarioOMail = async(nombre, email, searchOver) => {
  let result = await supabase.from(SUPABASE_USUARIOS_COLLECTION).select('*').eq('nombre', nombre);
  let result2 = await supabase.from(SUPABASE_USUARIOS_COLLECTION).select('*').eq('email', email);

  console.log(result2.data);
  let dataResult = {
    existeUsuario :  result.data.length > 0,
    existeEmail: result2.data.length > 0
  }

  searchOver(dataResult);
}

export const addUsuario = async(usuario, success) => {
  const { data } = await supabase
  .from(SUPABASE_USUARIOS_COLLECTION)
  .insert([
    { nombre: usuario.nombre, password: usuario.password , email: usuario.email },
  ])
  .select()

  success(data[0]);

}

export const getUsuarioByNombreYPass = async(usuario, success) => {
  let result = await supabase.from(SUPABASE_USUARIOS_COLLECTION).select('*').eq('nombre', usuario.nombre).eq('password', usuario.password);

  result.data ? success(result.data[0]) : success(null);
}