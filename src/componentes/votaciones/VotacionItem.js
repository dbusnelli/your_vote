import { useState } from "react";
//import { updateItemVotacion } from "../../supabase/Crud";

const VotacionItem = (props) => {
  const [id, setId] = useState(props.item.id);
  const [nombre, setNombre] = useState(props.item.nombre);
  const [votos, setVotos] = useState(props.item.votos);

  const [editando, setEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(nombre);
  const [nuevosVotos, setNuevosVotos] = useState(votos);
  const [usuarioVoto, setUsuarioVoto] = useState(false);
  const [limiteDeVotosAlcanzado, setLimiteDeVotosAlcanzado] = useState(false);

  const handleEditar = () => {
    setEditando(!editando);
  };

  const handleConfirmar = () => {
    setNombre(nuevoNombre);
    setVotos(nuevosVotos);
    setEditando(!editando);
    let data  = {
      id: id,
      nombre: nuevoNombre,
      votos: nuevosVotos
    }
    guardarEnSupabase(data);
  };

  const handleMas = () => {
    let newVotos = votos + 1;
    setVotos(newVotos);
    setNuevosVotos(newVotos);
    setUsuarioVoto(true)
    setLimiteDeVotosAlcanzado(true);
  };

  const handleGuardarVotos = () => {
    let data = {
      id: id,
      nombre: null,
      votos: votos
    }
    setUsuarioVoto(!usuarioVoto);
    guardarEnSupabase(data);
  }

  const guardarEnSupabase = (data) => {
    //updateItemVotacion(data)
  }

  return (
    <>
      <li class="list-group-item">
        <p>
          {nombre} | Votos: {votos}
        </p>
        {!limiteDeVotosAlcanzado ?
        <button type="button" class="btn btn-success" onClick={handleMas}>
          Votar
        </button>
        :null}
        <button type="button" class="btn btn-secondary" onClick={handleEditar}>
          Editar
        </button>
        {usuarioVoto ?
        <button type="button" class="btn btn-primary" onClick={handleGuardarVotos}>
        Guardar Votos
      </button>
        : null}
        
      </li>
      {editando ? (
        <>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">
              Nuevo Nombre
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Ingrese un nuevo Nombre"
              aria-label="Nuevo Nombre"
              aria-describedby="basic-addon1"
              onChange={(e) => setNuevoNombre(e.target.value)}
              value={nuevoNombre}
            ></input>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">
              Nuevos Votos
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Ingrese los Nuevos Votos"
              aria-label="Nuevos Votos"
              aria-describedby="basic-addon1"
              onChange={(e) => setNuevosVotos(e.target.value)}
              value={nuevosVotos}
            ></input>
          </div>
          <div class="row justify-content-start">
            <div class="col-4">
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleConfirmar}
              >
                Confirmar
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default VotacionItem;
