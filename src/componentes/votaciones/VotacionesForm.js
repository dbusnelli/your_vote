import { useEffect, useState  } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addVotacionOnSupabase } from "../../supabase/Crud";
import { PATH_HOME, PATH_MIS_VOTACIONES } from "../../utils/constants";


const VotacionesForm = () => {
  const [titulo, setTitulo] = useState("");
  const [errorTitulo, setErrorTitulo] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [errorDescripcion, setErrorDescripcion] = useState(false);
  const [maximoVotoUsuario, setMaximoVotoUsuario] = useState(5);
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.usuario.usuario);

  useEffect(() => {
    if(!usuario){
      navigate(PATH_HOME);
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarCampos()) {
      let newVotacion = {
        id: 1,
        nombre: titulo,
        descripcion: descripcion,
        created_by: usuario.nombre,
        maximoVotoUsuario: maximoVotoUsuario
      };   
      addVotacionOnSupabase(newVotacion);
      navigate(PATH_MIS_VOTACIONES);
    }
  };

  const validarCampos = () => {
    let valido = true;
    if (!titulo || titulo == "") {
      setErrorTitulo("El titulo no puede quedar vacio")
      valido = false;
    }else{
      setErrorTitulo(null);
    }
    if (!descripcion || descripcion == "") {
      setErrorDescripcion("La descripcion no puede quedar vacia");
      valido = false;
    }else{
      setErrorDescripcion(null)
    }
    return valido;
  };

  

  return (
    <div className="w-75">
      <p className="h1">Agregue una Votacion</p>
      <div className="form-group row">
        <label htmlFor="tituloVotacion" className="col-form-label">
          Titulo de la Votacion
        </label>
        <input
          type="text"
          className={errorTitulo ? "form-control is-invalid" : "form-control"}
          placeholder="Ingrese un titulo"
          aria-label="Titulo"
          onChange={(e) => setTitulo(e.target.value)}
          value={titulo}
          id="tituloVotacion"
        ></input>
        {errorTitulo ? (
          <div className="invalid-feedback">{errorTitulo}</div>
        ) : null}
      </div>
      <div className="form-group row">
        <label htmlFor="descripcionVotacion" className="col-form-label">
          Describe la Votacion
        </label>
        <input
          type="text"
          className={
            errorDescripcion ? "form-control is-invalid" : "form-control"
          }
          placeholder="Ingrese una descripcion"
          aria-label="Descripcion"
          onChange={(e) => setDescripcion(e.target.value)}
          value={descripcion}
          id="descripcionVotacion"
        ></input>
        {errorDescripcion ? (
          <div className="invalid-feedback">{errorDescripcion}</div>
        ) : null}
      </div>
      <div class="form-group row">
        <label for="selectMaxVotos" class="form-label mt-1">
          Maximo de Votos por Usuario
        </label>
        <select
          class="form-select"
          id="selectMaxVotos"
          value={maximoVotoUsuario}
          onChange={(e) => setMaximoVotoUsuario(e.target.value)}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <div className="row justify-content-start mt-4">
        <div className="col-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotacionesForm;
