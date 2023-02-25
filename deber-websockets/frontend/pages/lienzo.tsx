import {useRouter} from "next/router";
import ListaParticipantes, {Participante} from "../components/ListaParticipantes";
import {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {getSocket} from "../utils/socket";
import CanvasComponent from "../components/CanvasComponent";
import {SketchPicker} from "react-color";
import {Divider, Slide, Typography} from "@mui/material";
export default function Lienzo(){
    const [color, setColor] = useState('#0000FF')

    useEffect(() => {
        console.log(color)
    }, [color])
    const router = useRouter()
    const socket: Socket = getSocket()
    const {salaId} = router.query

    const [participantes, setParticipantes] = useState([] as Participante[])
    useEffect(() => {
        console.log("useEFfect")
        if(salaId){
            socket.emit('participantes', {salaId}, ({participantes}: {participantes: Participante[]}) => {
                console.log(participantes)
                setParticipantes(participantes)
            })
            console.log("Se ha emitido el evento participantes")
        }else{
            console.log("Sala id vacia")
        }

        socket.on('participantes', ({participantes}: {participantes: Participante[]}) => {
            console.log(participantes)
            setParticipantes(participantes)
        })
    }, [])


    return (<div style={{textAlign: 'center'}}>
        <Typography variant='h2' gutterBottom>Sala: {salaId}</Typography>
        <ListaParticipantes participantes={participantes}/>
        <Divider/>
        <CanvasComponent color={color}/>
        <div style={{marginTop: '20px'}}>
            <label style={{marginTop: '20px'}}>Selecciona un color: </label>
            <input type="color" value={color} onChange={(event) => {setColor(event.target.value)}}/>
        </div>


    </div>)
}