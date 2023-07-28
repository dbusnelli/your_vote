import Votacion from "./Votacion";

const VotacionesForm = () => {

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
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          ></input>
        </div>
        
        <p class="h2">Sus Votaciones</p>
        <Votacion />
      </>
    );

}

export default VotacionesForm;