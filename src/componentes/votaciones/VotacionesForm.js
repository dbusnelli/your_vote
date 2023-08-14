import { useState,  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modifyVotaciones } from "../../redux/reducers/votaciones";


const VotacionesForm = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const votaciones = useSelector((state) => state.votaciones.votaciones);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if (validarCampos()) {
      e.preventDefault();
      let newVotacion = {
        id:1,
        nombre: titulo,
        descripcion: descripcion
      };
      let newVotaciones = [];
      newVotaciones.push(newVotacion);
      setTitulo("");
      setDescripcion("");
      dispatch(modifyVotaciones(newVotaciones))
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
    </>
  );
};

export default VotacionesForm;
