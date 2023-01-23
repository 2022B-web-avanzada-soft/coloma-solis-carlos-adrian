import {useEffect, useState} from "react";
interface Usuario{
    nombre: string;
    edad: number;
    casado: boolean;
    hijos?: number[];
}


export default function (){
    const [numero, setNumero] = useState(0);
    const [nombre, setNombre] = useState('');
    const [arregloNumeros, setArregloNumeros] = useState([1,2,3]);
    const [usuario, setUsuario] = useState({
        nombre: 'Adrian',
        edad: 33,
        casado: true,
    } as Usuario);
    //setUsuario({nombre: "Vicente", edad: 32, casado: false, hijos: []})

    //ayuda a escuchar cambios de variables
    useEffect(() => {
        console.log("INICIO EL COMPONENETE", numero, usuario)
    },
        []) // Si esta vacio se ejecuta al principio una vez

    useEffect(() => {
            console.log("Cambio el numero", numero)
        },
        [numero])

    useEffect(() => {
            console.log("Cambio arregloNumeros", numero)
        },
        [arregloNumeros])

    useEffect(() => {
            console.log("Cambio usuario", numero)
        },
        [usuario])

    useEffect(() => {
        console.log("Cambio todo")
    },
        [numero, arregloNumeros, usuario])

    return (<>
        <button className="bg-blue-500 m-2" onClick={(event) => {
            event.preventDefault()
            setNumero(numero + 1)
        }}>Numero</button>
        <button className="bg-blue-500 m-2" onClick={(event) => {
            event.preventDefault()
            setArregloNumeros([...arregloNumeros, 1]);
        }}>Arreglo</button>
        <button className={"bg-blue-500 m-2"} onClick={(event) => {
            event.preventDefault()
            let usuarioNuevo = {...usuario, nombre: new Date().toString()};
            setUsuario(usuarioNuevo);
        }}>Usuario</button>
    </>)
}