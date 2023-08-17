import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { setUsuario } from "../../redux/reducers/usuario";
import { getUsuarioByNombreYPass } from "../../supabase/Crud";
import { PATH_HOME, PATH_RECUPERAR_PASS, PATH_SIGNIN } from "../../utils/constants";

const LoginPage = () => {

    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [intentos, setIntentos] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
      e.preventDefault();
      let usuario = {
        nombre: nombre,
        password: password
      }
      getUsuarioByNombreYPass(usuario, usuarioExiste);
    };

    const usuarioExiste = (result) => {
      if (!result) {
        setError("No hay ningun usuario que coincida");
        setIntentos(intentos + 1);
      } else {
        dispatch(setUsuario(result));
        navigate(PATH_HOME)
      }
    };

    return (
      <div className="w-75">
        <p className="h1">Login</p>
        <div className="form-group row">
          <label htmlFor="nombre" className="col-form-label">
            Nombre de Usuario
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese su nombre de usuario"
            aria-label="Nombre de usuario"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
            id="nombre"
          ></input>
        </div>
        <div className="form-group row">
          <label htmlFor="password" className="col-form-label">
            Contraseña
          </label>
          <input
            type="password"
            className={"form-control"}
            placeholder="Ingrese su contraseña"
            aria-label="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
          ></input>
          {error ? (
            <ul className="list-group mt-3">
              <li className="list-group-item list-group-item-danger d-flex justify-content-between align-items-center p-10">
                {error} {intentos > 2 ? <Link to={PATH_RECUPERAR_PASS}>No me acuerdo mi contraseña o usuario</Link> : null}
              </li>
            </ul>
          ) : null}
        </div>
        <div className="row justify-content-start mt-3">
          <div className="col-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Log in
            </button>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <figure className="text-center">
            <hr className="hr" />
            <p className="h4">Si aun no tiene un usuario presione aqui</p>
            <Link
              className="btn btn-info mt-3"
              to={PATH_SIGNIN}
            >
              Crear un Usuario
            </Link>
          </figure>
        </div>
      </div>
    );
}

export default LoginPage;