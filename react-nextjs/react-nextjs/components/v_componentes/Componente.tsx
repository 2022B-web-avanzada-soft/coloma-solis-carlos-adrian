//b_componentes/Componente.tsx
import {useState} from "react";

type PropiedadesComponente = {
    url: string;
    iteraciones: number;
    mostrar: boolean;
}
export default function(props: PropiedadesComponente){
    const {url, iteraciones, mostrar} = props;
    const [numeroUno, numeroDos] = [1, 0];

    const [iteracion, setIteracion] = useState(iteraciones)
    const contenidoAdicional : () =>
        (JSX.Element) = () => {
            if (mostrar) {
                return <p>Hola</p>
            }

            return <></>
        };

    return (
        <>
            <a target="_blank" href={url}>IR A GOOGLE</a>
            {/*mostrar ? <p>Hello</p> : <></>*/}
            {contenidoAdicional()}
            {mostrar &&
                <h1>Si muestra</h1>
            }
            <button className="bg-blue-500" onClick={
                (event) => {
                    console.log(event);
                    setIteracion(iteracion + 1);
                    console.log('DIO CLICK');
                }
            }> Aumentar</button>

        </>
    )
}