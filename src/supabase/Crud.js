import { supabase } from "./Config";
import { SUPABASE_VOTACIONES_COLLECTION, SUPABASE_ITEMS_VOTACIONES_COLLECTION, SUPABASE_USUARIOS_COLLECTION,
  SUPABASE_VOTACIONES_POR_USUARIO_COLLECTION} from "../utils/constants";

export const fetchVotaciones = async (modificarVotaciones) => {
  let result = await supabase.from(SUPABASE_VOTACIONES_COLLECTION).select("*").order('created_at', { ascending: false });
  modificarVotaciones(result.data);
};

export const fetchVotacionesByUsername = async(userName, modificarVotaciones) => {
  let result = await supabase.from(SUPABASE_VOTACIONES_COLLECTION).select("*").eq('created_by', userName).order('created_at', { ascending: false });
  modificarVotaciones(result.data);
};

export const fetchVotacionesByFiltro = async(filtro, modificarVotaciones) => {
  var fil = decodeURI(filtro);
  const filtroFinal = fil.replace(/\s/g, ' or ');
  let result = await supabase.from(SUPABASE_VOTACIONES_COLLECTION).select("*").order('created_at', { ascending: false })
  .textSearch('nombre', filtroFinal , {
    type: 'websearch',
    config: 'english'
  })
  let result2 = await supabase.from(SUPABASE_VOTACIONES_COLLECTION).select("*").order('created_at', { ascending: false })
  .textSearch('created_by', filtroFinal, {
    type: 'websearch',
    config: 'english'
  })
  let result3 = await supabase.from(SUPABASE_VOTACIONES_COLLECTION).select("*").order('created_at', { ascending: false })
  .textSearch('descripcion', filtroFinal, {
    type: 'websearch',
    config: 'english'
  })

  let finalResult = [];
  finalResult = result.data.length > 0 ? finalResult.concat(result.data) : finalResult;
  finalResult = result2.data.length > 0 ? finalResult.concat(result2.data) : finalResult;
  finalResult = result3.data.length > 0 ? finalResult.concat(result3.data) : finalResult;
  let busquedaFinal = null;
  
  if(finalResult.length > 0){
    const uniqueIds = [];
    busquedaFinal = finalResult.filter(element => {
      const isDuplicate = uniqueIds.includes(element.id);
  
      if (!isDuplicate) {
        uniqueIds.push(element.id);
  
        return true;
      }
  
      return false;
    });
  }
  modificarVotaciones(busquedaFinal ? busquedaFinal : [])
}

export const addVotacionOnSupabase = async (votacion) => {

  await supabase
  .from(SUPABASE_VOTACIONES_COLLECTION)
  .insert([{
      nombre: votacion.nombre,
      descripcion: votacion.descripcion,
      maximoVotoUsuario: votacion.maximoVotoUsuario,
      created_by: votacion.created_by
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

export const getUsuarioByNombre = async(usuario, success) => {
  let result = await supabase.from(SUPABASE_USUARIOS_COLLECTION).select('*').eq('nombre', usuario);
  success(result.data[0]);
}

export const updateCantVotosByUsuario = async(item) => {
  let query = await supabase.from(SUPABASE_VOTACIONES_POR_USUARIO_COLLECTION).select('*').eq('usuario', item.usuario).eq('id_votacion', item.id_votacion);
  if(query.data.length == 0){
    await createVotosForUsuario(item);
  }else{
    let obj =  query.data[0];
    obj.cantidad_votos = obj.cantidad_votos + 1;
    await updateAddVotoForUsuario(obj);
  }
}

export const createVotosForUsuario = async(item) => {
  await supabase
    .from(SUPABASE_VOTACIONES_POR_USUARIO_COLLECTION)
    .insert([
      {
        id_votacion: item.id_votacion,
        usuario: item.usuario,
        cantidad_votos: 1,
      },
    ])
}

export const updateAddVotoForUsuario = async (item) => {
  await supabase
    .from(SUPABASE_VOTACIONES_POR_USUARIO_COLLECTION)
    .update(item)
    .eq("id", item.id)
    .select();
};

export const getVotosDisponiblesParaVotacion = async(usuario, idVotacion, success) => {
  let result = await supabase.from(SUPABASE_VOTACIONES_POR_USUARIO_COLLECTION).select('*').eq('usuario', usuario).eq('id_votacion', idVotacion);
  let result2 = await supabase.from(SUPABASE_VOTACIONES_COLLECTION).select("*").eq('id', idVotacion);
  
  result.data.length > 0 ? success(result2.data[0].maximoVotoUsuario - result.data[0].cantidad_votos) : success(result2.data[0].maximoVotoUsuario);
}