import Persona from "./persona.js";
import personaDAO from "./personaDAO.js";
import Mascota from "./mascota.js";
import inquirer from 'inquirer'
import PersonaDAO from "./personaDAO.js";
import {MascotaDAO} from "./mascotaDAO.js";

function main(){
    promptPrincipal()
}

async function manejarLeerPersona() {
    let answers = await inquirer.prompt([{
        type: 'input',
        name: 'id',
        message: 'Ingresa el id de la persona'
    }])

    let persona = personaDAO.leer(answers.id)
    console.log(persona)
}

async function manejarCrearPersona() {
    let answers = await inquirer.prompt([{
        type: 'input',
        name: 'id',
        message: 'Ingresa el id de la persona'
    },
        {
            type: 'input',
            name: 'nombre',
            message: 'Ingresa el nombre de la persona'
        },
        {
            type: 'input',
            name: 'fechaNacimiento',
            message: 'Ingresa la fecha de nacimiento de la persona'
        },
        {
            type: 'confirm',
            name: 'estaCasado',
            message: 'Ingresa si la persona esta casada'
        }
    ])

    let persona = new Persona(answers.id, answers.nombre, new Date(answers.fechaNacimiento), answers.estaCasado)
    personaDAO.crear(persona)
    console.log('Persona creada exitosamente')
}

async function manejarActualizarPersona() {
    let answers = await inquirer.prompt([{
        type: 'input',
        name: 'id',
        message: 'Ingresa el id de la persona'
    },
        {
            type: 'list',
            name: 'atributo',
            message: 'Que atributo deseas actualizar?',
            choices: ['nombre', 'fechaNacimiento', 'estaCasado']
        },
        {
            type: 'input',
            name: 'valor',
            message: 'Ingresa el nuevo valor'
        }
    ])

    let persona = personaDAO.leer(answers.id)
    switch (answers.atributo) {
        case 'nombre':
            persona.nombre = answers.valor
            break;
        case 'fechaNacimiento':
            persona.fechaNacimiento = new Date(answers.valor)
            break;
        case 'estaCasado':
            persona.estaCasado = answers.valor
            break;
    }

    personaDAO.actualizar(persona)
    console.log('Persona actualizada exitosamente')
}

async function manejarEliminarPersona() {
    let answers = await inquirer.prompt([{
        type: 'input',
        name: 'id',
        message: 'Ingresa el id de la persona'
    }])

    let seElimino: boolean = personaDAO.eliminar(answers.id)
    if (seElimino) {
        console.log('Persona eliminada exitosamente')
    }else {
        console.log('No se pudo eliminar la persona')
    }
}

async function manejarLeerMascota(daoMascotas: MascotaDAO) {
    let answers = await inquirer.prompt([{
        type: 'input',
        name: 'id',
        message: 'Ingresa el id de la mascota'
    }])

    let mascota = daoMascotas.leer(parseInt(answers.id))
    if(mascota){
        console.log(mascota)
    }else {
        console.log('No se encontro la mascota')
    }

}

async function manejarCrearMascota(daoMascotas: MascotaDAO) {
    let answers = await inquirer.prompt([{
        type: 'input',
        name: 'id',
        message: 'Ingresa el id de la mascota'
    },
        {
            type: 'input',
            name: 'nombre',
            message: 'Ingresa el nombre de la mascota'
        },
        {
            type: 'input',
            name: 'fechaNacimiento',
            message: 'Ingresa la fecha de nacimiento de la mascota'
        },
        {
            type: 'confirm',
            name: 'estaVacunado',
            message: 'Ingresa si la mascota esta vacunada'
        }
    ])

    let mascota = new Mascota(parseInt(answers.id), answers.nombre, new Date(answers.fechaNacimiento), answers.estaVacunado)
    daoMascotas.crear(mascota)
    console.log('Mascota creada exitosamente')
}

async function manejarActualizarMascota(daoMascotas: MascotaDAO) {

    let answers = await inquirer.prompt([{
        type: 'input',
        name: 'id',
        message: 'Ingresa el id de la mascota'
    },
        {
            type: 'list',
            name: 'atributo',
            message: 'Que atributo deseas actualizar?',
            choices: ['nombre', 'fechaNacimiento', 'estaVacunado']
        },
        {
            type: 'input',
            name: 'valor',
            message: 'Ingresa el nuevo valor'
        }
    ])

    let mascota = daoMascotas.leer(answers.id)
    switch (answers.atributo) {
        case 'nombre':
            mascota.nombre = answers.valor
            break;
        case 'fechaNacimiento':
            mascota.fechaNacimiento = new Date(answers.valor)
            break;
        case 'estaVacunado':
            mascota.estaVacunado = answers.valor === 'true'
            break;
    }

    daoMascotas.actualizar(mascota)
    console.log('Mascota actualizada exitosamente')
}

async function manejarEliminarMascota(daoMascotas: MascotaDAO) {
    let answers = await inquirer.prompt([{
        type: 'input',
        name: 'id',
        message: 'Ingresa el id de la mascota'
    }])

    let seElimino: boolean = daoMascotas.eliminar(answers.id)
    if (seElimino) {
        console.log('Mascota eliminada exitosamente')
    }else {
        console.log('No se pudo eliminar la mascota')
    }
}


async function promptMascota(opcionEscogida: string, persona: Persona) {
    let daoMascotas = new MascotaDAO(persona.mascotas)

    switch (opcionEscogida) {
        case 'Listar las mascotas':
            console.log(persona.mascotas)
            break;
        case 'Crear una mascota':
            await manejarCrearMascota(daoMascotas);
            break;
        case 'Leer una mascota':
            await manejarLeerMascota(daoMascotas);
            break;
        case 'Actualizar una mascota':
            await manejarActualizarMascota(daoMascotas);
            break;
        case 'Eliminar una mascota':
            await manejarEliminarMascota(daoMascotas);
            break;
            case 'Volver':
                return
                break;
    }

    await gestionarMascotas(persona)

}
async function gestionarMascotas(persona: Persona) {

    if (persona) {
        let answers = await inquirer.prompt([{
            type: 'list',
            name: 'opcion',
            message: 'Que deseas hacer?',
            choices: ['Listar las mascotas', 'Crear una mascota', 'Leer una mascota', 'Actualizar una mascota', 'Eliminar una mascota', 'Volver']
        }])

        await promptMascota(answers.opcion, persona)
    }else {
        console.log('No se encontro la persona')
    }
}

async function promptPersona(opcionEscogida: string) {
    switch (opcionEscogida) {
        case 'Listar las personas':
            console.log(PersonaDAO.personas)
            break;
        case 'Crear una persona':
            await manejarCrearPersona();
            break;
        case 'Leer una persona':
            await manejarLeerPersona();
            break;
        case 'Actualizar una persona':
            await manejarActualizarPersona();
            break;
        case 'Eliminar una persona':
            await manejarEliminarPersona();
            break;
        case 'Gestionar mascotas':
            let answers = await inquirer.prompt([{
                type: 'input',
                name: 'id',
                message: 'Ingresa el id de la persona'
            }])

            let persona = personaDAO.leer(answers.id)
            await gestionarMascotas(persona);
            break;

    }

    promptPrincipal()
}
function promptPrincipal(){
    inquirer.prompt([{
        type: 'list',
        name: 'opcion',
        message: 'Que deseas hacer?',
        choices: ['Listar las personas', 'Crear una persona', 'Leer una persona', 'Actualizar una persona', 'Eliminar una persona', 'Gestionar mascotas']
    }])
        .then((answers) => {
            promptPersona(answers.opcion)
        })

}



main()