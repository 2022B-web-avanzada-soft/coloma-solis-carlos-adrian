import EComponenteC from "./EComponenteC";
import {ContenedorContext} from "./ContenedorContext";
import {useContext} from "react";

export default function(){
    const contenedorContexto = useContext(ContenedorContext);
    return(<>
        Componente B
        <p>{contenedorContexto.nombreUsuario}</p>
        <button onClick={ e => {
            e.preventDefault();
            contenedorContexto.setNombreUsuario('CompB')
        }}>
            Actualizar
        </button>
        <EComponenteC></EComponenteC>
    </>)
}