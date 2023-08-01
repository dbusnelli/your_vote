import { useState, useEffect } from "react";
import { addVotacionOnSupabase } from "../../supabase/Crud";
import { supabase } from "../../supabase/Config";
import Votacion from "./Votacion";

const VotacionesForm = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [votaciones, setVotaciones] = useState([]);

  useEffect(() => {
    const obtenerVotaciones = async () => {
    

      let result = await supabase.from('votaciones').select('*');
    
      setVotaciones(result.data); 
    
    }
    obtenerVotaciones();
  }, []);

  

  const handleSubmit = (e) => {
    if (validarCampos()) {
      e.preventDefault();
      let newVotacion = {
        nombre: titulo,
        descripcion: descripcion
      };
      let idNew = addVotacionOnSupabase(newVotacion);
      console.log(idNew)
      newVotacion.id = idNew;
      setVotaciones([...votaciones, newVotacion]);
      setTitulo("");
      setDescripcion("");
    }
  };

  const validarCampos = () => {
    if (titulo == "") {
      alert("El titulo no puede quedar vacio");
      return false;
    }
    if (descripcion == "") {
      alert("La descripcion no puede quedar vacia");
      return false;
    }
    return true;
  };

  return (
    <>
      <p class="h1">Agregue una Votacion</p>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">
          Título de la votacion
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Ingrese un titulo"
          aria-label="Titulo"
          aria-describedby="basic-addon1"
          onChange={(e) => setTitulo(e.target.value)}
          value={titulo}
        ></input>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">
          Descripcion de la votacion
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Ingrese una descripcion"
          aria-label="Descripcion"
          aria-describedby="basic-addon1"
          onChange={(e) => setDescripcion(e.target.value)}
          value={descripcion}
        ></input>
      </div>
      <div class="row justify-content-start">
        <div class="col-4">
          <button type="button" class="btn btn-primary" onClick={handleSubmit}>
            Agregar
          </button>
        </div>
      </div>

      <p class="h2">Sus Votaciones</p>
      {votaciones.length > 0 ? (
        <div className="col-md-8">
          {votaciones.map((votacion) => (
            <div key={votacion.id}>
              {<Votacion votacion={votacion} />}
            </div>
          ))}
        </div>
      ) : (
        <p class="h4">No tiene votaciones aun</p>
      )}
    </>
  );
};

export default VotacionesForm;
