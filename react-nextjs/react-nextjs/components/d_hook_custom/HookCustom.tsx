import useSelectMoneda from "../hooks/useSelectMoneda";
import {useEffect} from "react";
import {MONEDAS} from "./monedas";

export default function(){
    const [moneda, UseSelectMonedas] = useSelectMoneda('Moneda',
        MONEDAS);

    useEffect(
        ()=>{
            console.log('Cambio moneda', moneda)
        },
        [moneda]
    )

    return (
        <>
            {UseSelectMonedas}</>
    )

}