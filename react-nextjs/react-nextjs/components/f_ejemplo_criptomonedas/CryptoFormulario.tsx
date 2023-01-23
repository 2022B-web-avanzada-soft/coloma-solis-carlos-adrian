import {useEffect, useState} from "react";
import {MONEDAS} from "../d_hook_custom/monedas";
import {MonedasInterface} from "../../interfaces/moneda";
import useSelectMoneda from "../hooks/useSelectMoneda";
import {ConsultaMoneda} from "../../pages/f_ejemplo_criptomonedas";

export default function(params){
    const {setMonedas} = params;
    const [monedasArreglo, setMonedaArreglo] = useState(MONEDAS);
    const [criptoMonedasArreglo, setCriptoMonedaArreglo] = useState([] as MonedasInterface[]);
    const [valorMoneda, SelectMonedaComponente] = useSelectMoneda('Seleccionar moneda', monedasArreglo);
    const [valorCriptoMoneda, SelectCriptoMonedaComponente] = useSelectMoneda('Seleccionar criptomoneda', criptoMonedasArreglo);
    useEffect(
        ()=>{
            const consultarAPICripto = async () =>{
                const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                const arregloCriptos = resultado.Data.map(
                    (criptoMoneda) =>{
                        const criptoMonedaLocal: MonedasInterface = {
                            id: criptoMoneda.CoinInfo.Name,
                            nombre: criptoMoneda.CoinInfo.FullName,
                        }

                        return criptoMonedaLocal;
                    }
                )
                setCriptoMonedaArreglo(arregloCriptos);
            }
            consultarAPICripto().then().catch(error =>
                console.log(error));
        },
        []
    )

    const manejarSubmitFormulario = (e: any) =>{
        e.preventDefault();
        const monedasConsulta: ConsultaMoneda = {
            valorCriptomoneda: valorCriptoMoneda as string,
            valorMoneda: valorMoneda as string,
        }

        setMonedas(monedasConsulta);
    }

    return (
        <>
            <form onSubmit={manejarSubmitFormulario}>
                {SelectMonedaComponente}
                {SelectCriptoMonedaComponente}
                <br/>
                <button className={'btn btn-primary w-100'} type={'submit'}>Consultar</button>
            </form>
        </>
    )
}