import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUsuario } from "../../redux/reducers/usuario";
import { addUsuario, existeNombreUsuario } from "../../supabase/Crud";
import { MINIMO_CARACTERES_NOMBRE, MINIMO_CARACTERES_PASSWORD, PATH_HOME } from "../../utils/constants";

const SignInPage = () => {

    const [nombre, setNombre] = useState("");
    const [errorNombre, setErrorNombre] = useState(null);
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState(null);
    const [confirmacionPass, setConfirmacionPass] = useState("")
    const [errorConfirmacionPass, setErrorConfirmacionPass] = useState(null);
    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
      e.preventDefault();
      if (validarCampos()) {
        await existeNombreUsuario(nombre, searchOver);
      }
    };

    const searchOver = (existeUsuario) => {
        if(existeUsuario){
            setErrorNombre("El nombre de usuario no esta disponible")
        }else{
            let usuario = {
                nombre: nombre,
                password: password,
                email: email
            }

            addUsuario(usuario, succes)
        }
    }

    const succes = (data) => {
        dispatch(setUsuario(data))
        navigate(PATH_HOME);
    }

    const validarCampos = () => {
      let valido = true;

      if(!email || email == ""){
          valido = false;
          setErrorEmail("Ingrese un email")
      }else if(!validarEmail()){
        valido = false;
          setErrorEmail("Ingrese un email valido");
      }else{
          setErrorEmail(null)
      }

      if (!nombre || nombre == "") {
        setErrorNombre("Ingrese un nombre de usuario");
        valido = false;
      } else if (nombre.length < MINIMO_CARACTERES_NOMBRE) {
        valido = false;
        setErrorNombre(
          "El nombre de usuario tiene que tener al menos " +
            MINIMO_CARACTERES_NOMBRE +
            " caracteres."
        );
      } else {
        setErrorNombre(null);
      }

      if (!password || password == "") {
        setErrorConfirmacionPass(null)
        setErrorPassword("Ingrese una contraseña");
        valido = false;
      } else if (password.length < MINIMO_CARACTERES_PASSWORD) {
        valido = false;
        setErrorConfirmacionPass(null)
        setErrorPassword(
          "La contraseña debe tener al menos " +
            MINIMO_CARACTERES_PASSWORD +
            " caracteres."
        );
      } else if(password !== confirmacionPass){
          setErrorPassword(null)
        setErrorConfirmacionPass("Las contraseñas no coinciden");
      }else{
        setErrorPassword(null);
        setErrorConfirmacionPass(null);
      }
      return valido;
    };

    const validarEmail = () => {
        const rgExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return rgExp.test(email);
    }

    return (
      <div className="w-75">
        <p className="h1">Crear Usuario</p>
        <div className="form-group row">
          <label htmlFor="nombre" className="col-form-label">
            Nombre de Usuario
          </label>
          <input
            type="text"
            className={errorNombre ? "form-control is-invalid" : "form-control"}
            placeholder="Ingrese su nombre de usuario"
            aria-label="Nombre de usuario"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
            id="nombre"
          ></input>
          {errorNombre ? <div className="invalid-feedback">{errorNombre}</div> : 
          <small id="nombreHelp" className="form-text text-muted">La gente te vera con este nombre.</small>}
        </div>
        <div className="form-group row">
          <label htmlFor="email" className="col-form-label">
            E-mail
          </label>
          <input
            type="text"
            className={errorEmail ? "form-control is-invalid" : "form-control"}
            placeholder="email@example.com"
            aria-label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
          ></input>
          {errorEmail ? <div className="invalid-feedback">{errorEmail}</div> :
          <small id="nombreHelp" className="form-text text-muted">En caso de que olvides tu contraseña te mandaremos un mail a esta direccion.</small>}
        </div>
        <div className="form-group row">
          <label htmlFor="password" className="col-form-label">
            Contraseña
          </label>
          <input
            type="password"
            className={errorPassword ? "form-control is-invalid" : "form-control"}
            placeholder="Ingrese una contraseña segura"
            aria-label="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
          ></input>
          {errorPassword ? <div className="invalid-feedback">{errorPassword}</div> : null }
        </div>
        <div className="form-group row">
          <label htmlFor="passwordConfirm" className="col-form-label">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            className={errorConfirmacionPass ? "form-control is-invalid" : "form-control"}
            placeholder="Ingrese la misma contraseña"
            aria-label="Contraseña"
            onChange={(e) => setConfirmacionPass(e.target.value)}
            value={confirmacionPass}
            id="passwordConfirm"
          ></input>
          {errorConfirmacionPass ? <div className="invalid-feedback">{errorConfirmacionPass}</div> : null }
        </div>
        <div className="row justify-content-start mt-3">
          <div className="col-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Listo!
            </button>
          </div>
        </div>
      </div>
    );
}

export default SignInPage;