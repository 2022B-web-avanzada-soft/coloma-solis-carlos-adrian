import React, {useEffect, useState} from 'react'
import Link from "next/link";
import About from "./about";
import {Button, TextField} from "@mui/material";
import {io, Socket} from "socket.io-client";
import {useRouter} from "next/router";
import {getSocket} from "../utils/socket";

const socket :Socket = getSocket()
export default function Index() {
    const [nick, setNick] = useState('')
    const [salaInput, setSalaInput] = useState('')

    const router = useRouter()
    useEffect(() => {

    }, [])


    const crearSala = () => {
        socket.emit('crear-sala', {nick, salaId: salaInput}, ({salaId}) => {
            router.push({pathname: '/lienzo', query: {salaId: salaId}} )
        })
    }

    const unirseSala = () => {
        socket.emit('unirse-sala', {nick, salaId: salaInput}, ({exito}) => {
            if(exito){
                router.push({pathname: '/lienzo', query: {salaId: salaInput}} )
            }else{
                alert("Sala no encontrada")
            }
        })
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', gap: 20, height: '100vh'}}>
            <TextField label="Nick" variant="outlined" value={nick} onChange={e => setNick(e.target.value)}/>
            <TextField label="Sala" variant="outlined" value={salaInput} onChange={e => setSalaInput(e.target.value)}/>
            <div>
                <Button style={{marginRight: 10}} onClick={crearSala} variant='contained'>Crear</Button>
                <Button onClick={unirseSala} variant='contained'>Unirse</Button>
            </div>


        </div>
    )
}

