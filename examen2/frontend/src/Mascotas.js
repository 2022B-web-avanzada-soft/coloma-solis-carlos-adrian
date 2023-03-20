import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {deDE} from "@mui/x-data-grid";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {format} from "date-fns";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField,
} from "@mui/material";


export default function Mascotas({listaMascotas, consultarMascotas, idPersona, mostrarPersonas}) {
    const [open, setOpen] = useState(false);
    const [idActual, setIdActual] = useState(0);
    const [tituloMascotaInput, setTituloMascotaInput] = useState('Agregar Mascota');
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [estaVacunado, setEstaVacunado] = useState(false);
    const [funciones, setFunciones] = useState({funcionGuardado: guardarMascota});


    /*
    useEffect(() => {
        console.log('Se establecio el nombre ' + nombre)
    }, [nombre])

    useEffect(() => {
        console.log('Id actual nuevo ' + idActual)
    }, [idActual])*/

    function handleClose() {
        setOpen(false)
    }

    function eliminarMascota(id) {
        console.log('Eliminar mascota con id ' + id);
        fetch(`http://localhost:8080/persona/${idPersona}/mascotas/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                console.log('Mascota eliminada correctamente')
                consultarMascotas(idPersona)
            } else {
                console.log('Error al eliminar mascota')
            }
        })
    }

    function actualizarMascota(mascota, id) {
        fetch(`http://localhost:8080/persona/${idPersona}/mascotas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mascota)
        }).then(response => {
            if (response.ok) {
                console.log('Mascota actualizada correctamente')
                setOpen(false)
                consultarMascotas(idPersona)
            } else {
                console.log('Error al actualizar mascota')
            }
        })
    }

    function guardarMascota(mascota, id) {
        //const mascota = {nombre, estaVacunado, fechaNacimiento}
        console.log('Guardar mascota');
        fetch(`http://localhost:8080/persona/${idPersona}/mascotas/crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mascota)
        }).then(response => {
            if (response.ok) {
                console.log('Mascota guardada correctamente')
                setOpen(false)
                consultarMascotas(idPersona)
            } else {
                console.log('Error al guardar mascota')
            }
        })
    }

    function mostrarModalParaActualizar(id) {
        console.log('Editar mascota con id ' + id);
        fetch(`http://localhost:8080/persona/${idPersona}/mascotas/${id}`)
            .then(response => response.json())
            .then(data => {
                setNombre(data.nombre)
                setFechaNacimiento(data.fechaNacimiento)
                setEstaVacunado(data.estaVacunado)
                setIdActual(data.id)
                console.log("idActual " + idActual)
                setTituloMascotaInput('Editar Mascota')
                setFunciones({funcionGuardado: actualizarMascota})
                setOpen(true)
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <h1>Mascotas de persona con id {idPersona}</h1>
            <Button style={{marginRight: 10}} variant="contained" color="primary" onClick={() => {
                setNombre('')
                setFechaNacimiento('')
                setEstaVacunado(false)
                setTituloMascotaInput('Agregar Mascota')
                setFunciones({funcionGuardado: guardarMascota})
                setOpen(true)
            }}>
                Agregar Mascota
            </Button>
            <Button variant="contained" color="secondary" onClick={mostrarPersonas}>
                Mostrar personas
            </Button>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Fecha Nacimiento</TableCell>
                            <TableCell>Esta Vacunado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listaMascotas.map((mascota) => (
                            <TableRow key={mascota.id}>
                                <TableCell>{mascota.id}</TableCell>
                                <TableCell>{mascota.nombre}</TableCell>
                                <TableCell>{mascota.fechaNacimiento}</TableCell>
                                <TableCell>{mascota.estaVacunado ? 'Si' : 'No'}</TableCell>
                                <TableCell>
                                    <Button style={{marginRight: 10}} variant="contained" color="primary"
                                            onClick={() => mostrarModalParaActualizar(mascota.id)}>
                                        Editar
                                    </Button>
                                    <Button variant="contained" color="error"
                                            onClick={() => eliminarMascota(mascota.id)}>
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{tituloMascotaInput}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" id="nombre" label="Nombre" type="text" fullWidth
                               value={nombre}
                               onChange={(event) => setNombre(event.target.value)}/>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker label="Fecha Nacimiento" value={dayjs(fechaNacimiento).toDate()}
                                    onChange={(newValue) => {
                                        setFechaNacimiento(format(newValue, 'yyyy-MM-dd'));
                                    }} renderInput={(params) => <TextField {...params} />}/>
                    </LocalizationProvider>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Esta vacunado</InputLabel>
                            <Checkbox checked={estaVacunado} label="Esta vacunado" onChange={(e) => {
                                setEstaVacunado(e.target.checked)
                            }}/>
                        </FormControl>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => funciones.funcionGuardado({nombre, fechaNacimiento, estaVacunado}, idActual)}
                            color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}