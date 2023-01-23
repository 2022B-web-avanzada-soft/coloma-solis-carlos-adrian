import EstilosEjemplo from "../components/a_estilos/EstilosEjemplo";
import Componente from "../components/v_componentes/Componente";
import Layout from "../components/Layout";

export default function a_hola_mundo(){
    return (
        <>
            <Layout>
                <h1>Hola Mundo</h1>
                <EstilosEjemplo></EstilosEjemplo>
                <Componente iteraciones={3} mostrar={true} url={'http://google.com'}></Componente>
            </Layout>
        </>
    )
}