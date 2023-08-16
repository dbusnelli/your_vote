import { useState } from "react";
import { addItemVotacion } from "../../supabase/Crud";


import 'react-toastify/dist/ReactToastify.css';

const VotacionItemModalAgregar= (props) => {

    const [nombre, setnombre] = useState("");
    const [errorNombre, setErrorNombre] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const idVotacion = props.id;

    const handleClickAgregar = async (e) => {
      e.preventDefault();
      if(validarDatos()){
        setButtonDisabled(true);
        let data = {
          idVotacion: idVotacion,
          nombre: nombre,
        };
        await addItemVotacion(data, props.modificarItemsVotacion);
        props.handleClose();
        props.onSuccess();
      }
    };

    const close = (e) => {
        e.preventDefault();
        props.handleClose();
    }

    const validarDatos = () => {
        let valido = true;
        if(!nombre || nombre === ""){
            setErrorNombre("El nombre no puede quedar vacio");
            valido = false;
        }else{
            setErrorNombre(null);   
        }
        return valido;
    }

    return (
      <>
        <form>
          <fieldset>
            <legend>Item a Agregar</legend>
            <div className="form-group row">
              <label htmlFor="nombreItem" className="col-form-label">
                Nombre del item
              </label>
              <div className="ms-2 w-75">
                <input
                  type="text"
                  className={
                    errorNombre ? "form-control is-invalid" : "form-control"
                  }
                  id="nombreItem"
                  value={nombre}
                  onChange={(e) => setnombre(e.target.value)}
                />
                {errorNombre ? (
                  <div class="invalid-feedback">{errorNombre}</div>
                ) : null}
              </div>
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleClickAgregar}
                disabled={buttonDisabled}
              >
                Agregar
              </button>

              <button className="btn btn-secondary ms-1" onClick={close}>
                Cancelar
              </button>
            </div>
          </fieldset>
        </form>
      </>
    );
    
}

export default VotacionItemModalAgregar;