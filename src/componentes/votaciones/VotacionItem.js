import { useState } from "react";

const VotacionItem = (props) => {
  const [id, setId] = useState(props.item.id);
  const [nombre, setNombre] = useState(props.item.titulo);
  const [votos, setVotos] = useState(props.item.votos);

  const [editando, setEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(nombre);
  const [nuevosVotos, setNuevosVotos] = useState(votos);

  const handleEditar = () => {
    setEditando(!editando);
  };

  const handleConfirmar = () => {
    setNombre(nuevoNombre);
    setVotos(nuevosVotos);
    setEditando(!editando);
    handleGuardar();
  };

  const handleMenos = () => {
    if (votos > 0) {
      let newVotos = votos - 1;
      setVotos(newVotos);
      setNuevosVotos(newVotos);
    }
  };

  const handleMas = () => {
    let newVotos = votos + 1;
    setVotos(newVotos);
    setNuevosVotos(newVotos);
  };

  const handleGuardar = () => {
    console.log("guardando...");
  }

  return (
    <>
      <li class="list-group-item">
        <p>
          {nombre} | Votos: {votos}
        </p>
        <button type="button" class="btn btn-success" onClick={handleMas}>
          +
        </button>
        <button type="button" class="btn btn-warning" onClick={handleMenos}>
          -
        </button>
        <button type="button" class="btn btn-secondary" onClick={handleEditar}>
          Editar
        </button>
        <button type="button" class="btn btn-primary" onClick={handleGuardar}>
          Guardar Votos
        </button>
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
