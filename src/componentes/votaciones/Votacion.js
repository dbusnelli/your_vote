import VotacionItem from "./VotacionItem";

const Votacion = (props) => {

    return (
        <>
            <p class="h3"> - {props.votacion.nombre}</p>
            <p class="h5"> {props.votacion.descripcion}</p>
        </>
    ) 

}

export default Votacion;