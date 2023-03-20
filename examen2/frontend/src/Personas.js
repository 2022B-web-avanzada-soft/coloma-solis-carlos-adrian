import {
    Box,
    Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControl, Grid, InputLabel,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import {DateField, DatePicker, LocalizationProvider} from "@mui/x-date-pickers"
import {deDE} from "@mui/x-data-grid";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {format} from "date-fns";
import dayjs from "dayjs";


export default function Personas({listaPersonas, consultarPersonas, mostrarMascotas}) {
    const [open, setOpen] = useState(false);
    const [idActual, setIdActual] = useState(0);

    const [tituloPersonaInput, setTituloPersonaInput] = useState('Agregar Persona');
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [estaCasado, setEstaCasado] = useState(false);
    const [funciones, setFunciones] = useState({funcionGuardado: guardarPersona});

    /*
    useEffect(() => {
        console.log('Se establecio el nombre ' + nombre)
    }, [nombre])

    useEffect(() => {
        console.log('Id actual nuevo ' + idActual)
    }, [idActual])*/

    function handleClose(){
        setOpen(false)
    }
    function eliminarPersona(id) {
        console.log('Eliminar persona con id ' + id);
        fetch('http://localhost:8080/persona/' + id, {
            method: 'DELETE'
        }).then(response => {
if (response.ok) {
                console.log('Persona eliminada correctamente')
                consultarPersonas()
            } else {
                console.log('Error al eliminar persona')
            }
        })



    }

    function guardarPersona(persona, id){
        //const persona = {nombre, estaCasado, fechaNacimiento}
        console.log('Guardar persona');
        fetch('http://localhost:8080/persona/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(persona)
        }).then(response => {
            if (response.ok) {
                console.log('Persona guardada correctamente')
                setOpen(false)
                consultarPersonas()
            } else {
                console.log('Error al guardar persona')
            }
        })
    }

    function actualizarPersona(persona, id){
        //const persona = {nombre, estaCasado, fechaNacimiento}
        console.log('Actualizar persona ' + JSON.stringify(persona));
        fetch(`http://localhost:8080/persona/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(persona)
        }).then(response => {
            if (response.ok) {
                console.log('Persona actualizada correctamente')
                setOpen(false)
                consultarPersonas()
            } else {
                console.log('Error al actualizar persona')
            }
        })
    }

    const columns = [
        'Id',
        'Nombre',
        'Fecha de nacimiento',
        'Esta casado',
        'Acciones'
        ]

    function mostrarModalParaActualizar(id){
        setTituloPersonaInput("Actualizar persona");
        setFunciones({funcionGuardado: actualizarPersona})
        const persona = listaPersonas.find(persona => persona.id === id);
        setNombre(persona.nombre);
        setFechaNacimiento(persona.fechaNacimiento);
        setEstaCasado(persona.estaCasado);
        setIdActual(id);
        setOpen(true);
    }

    function mostrarModalParaCrear(){
        setTituloPersonaInput("Agregar persona");
        setFunciones({funcionGuardado: guardarPersona})
        setNombre('');
        setFechaNacimiento('');
        setEstaCasado(false);
        setOpen(true);
    }
    return(
        <div>
            <h1>Personas</h1>
            <TableContainer component={Paper}>
                <Button variant="contained" color="primary" onClick={mostrarModalParaCrear}>Agregar</Button>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell key={column}>{column}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listaPersonas.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.nombre}</TableCell>
                                <TableCell>{row.fechaNacimiento}</TableCell>
                                <TableCell>{row.estaCasado ? 'Sí' : 'No'}</TableCell>
                                <TableCell>
                                    <Button style={{marginRight: 10}} variant="contained" color="primary" onClick={() => {mostrarModalParaActualizar(row.id)}}>Editar</Button>
                                    <Button style={{marginRight: 10}} variant="contained" color="error" onClick={() => {eliminarPersona(row.id)}}>Eliminar</Button>
                                    <Button style={{marginRight: 10}} variant="contained" color="info" onClick={() => {mostrarMascotas(row.id)}}>Mascotas</Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>{tituloPersonaInput}</DialogTitle>
                <DialogContent style={{flexDirection: 'column'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField value={nombre} label="Nombre" onChange={e => setNombre(e.target.value)}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={deDE}>
                                    <DatePicker
                                        value={dayjs(fechaNacimiento).toDate()}
                                        label="Fecha de nacimiento"
                                        onChange={nuevoValor => {setFechaNacimiento(format(nuevoValor, "yyyy-MM-dd"))}}/>
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Esta casado</InputLabel>
                                <Checkbox checked={estaCasado} label="Esta casado" onChange={(e) => {setEstaCasado(e.target.checked)}}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={() => {funciones.funcionGuardado({nombre, fechaNacimiento, estaCasado}, idActual) ; setOpen(false)}}>Guardar</Button>
                        </Grid>

                    </Grid>



                </DialogContent>
            </Dialog>
        </div>
    )
}