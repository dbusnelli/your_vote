import { useState  } from "react";
import { useNavigate } from "react-router-dom";
import { addVotacionOnSupabase } from "../../supabase/Crud";
import { PATH_MIS_VOTACIONES } from "../../utils/constants";


const VotacionesForm = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (validarCampos()) {
      e.preventDefault();
      let newVotacion = {
        id: 1,
        nombre: titulo,
        descripcion: descripcion,
      };
      addVotacionOnSupabase(newVotacion);

      navigate(PATH_MIS_VOTACIONES);
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
      <p className="h1">Agregue una Votacion</p>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Título de la votacion
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese un titulo"
          aria-label="Titulo"
          aria-describedby="basic-addon1"
          onChange={(e) => setTitulo(e.target.value)}
          value={titulo}
        ></input>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Descripcion de la votacion
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese una descripcion"
          aria-label="Descripcion"
          aria-describedby="basic-addon1"
          onChange={(e) => setDescripcion(e.target.value)}
          value={descripcion}
        ></input>
      </div>
      <div className="row justify-content-start">
        <div className="col-4">
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            Agregar
          </button>
        </div>
      </div>
    </>
  );
};

export default VotacionesForm;
