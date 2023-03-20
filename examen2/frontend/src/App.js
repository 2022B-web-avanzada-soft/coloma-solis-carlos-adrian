
import './App.css';
import Personas from "./Personas";
import {useEffect, useState} from "react";
import Mascotas from "./Mascotas";

function App() {
    const [personas, setPersonas] = useState([]);
    const [mascotas, setMascotas] = useState([]);
    const [mostrandoMascotas, setMostrandoMascotas] = useState(false);
    const [idPersonaActual, setIdPersonaActual] = useState(0);
    function consultarPersonas() {
        fetch("http://localhost:8080/persona")
            .then(response => response.json())
            .then(data => setPersonas(data))
            .catch(error => console.log(error));
    }

    function consultarMascotas(idPersona) {
        fetch(`http://localhost:8080/persona/${idPersona}/mascotas`)
            .then(response => response.json())
            .then(data => setMascotas(data))
            .catch(error => console.log(error));
    }
    useEffect(() => {
        consultarPersonas()
    }, []);

    function mostrarMascotas(idPersona){
        consultarMascotas(idPersona)
        setMostrandoMascotas(true)
        setIdPersonaActual(idPersona)
    }

    function mostrarPersonas(){
        consultarPersonas()
        setMostrandoMascotas(false)
    }

  return (
    <div className="App">
        {mostrandoMascotas || <Personas listaPersonas={personas} consultarPersonas={consultarPersonas} mostrarMascotas={mostrarMascotas}/>}
        {mostrandoMascotas && <Mascotas listaMascotas={mascotas} consultarMascotas={consultarMascotas} idPersona={idPersonaActual} mostrarPersonas={mostrarPersonas}/>}
    </div>
  );
}

export default App;
