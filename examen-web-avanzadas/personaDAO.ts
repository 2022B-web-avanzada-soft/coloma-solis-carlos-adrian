import Persona from "./persona.js";
import * as fs from 'fs'
import DAO from "./DAO.js";
import {plainToClass, plainToInstance} from "class-transformer";
import Mascota from "./mascota.js";

class PersonaDAO extends DAO<Persona>{
    public personas : Persona[]

    constructor() {
        super()
        this.personas = []
        let json = fs.readFileSync(this.filePath).toString()
        try{
            let arregloObjs: any[]= JSON.parse(json)
            arregloObjs.forEach(obj => {
                let persona : Persona = plainToInstance(Persona, obj)
                let mascotas : Mascota[] = []
                persona.mascotas.forEach(objMascota => {
                    mascotas.push(plainToInstance(Mascota, objMascota))
                })

                persona.mascotas = mascotas
                this.personas.push(persona)
            })
        }catch(e){

        }


    }

    guardar(){
        fs.writeFileSync(this.filePath, JSON.stringify(this.personas))
    }

    crear(persona: Persona){
        this.personas.push(persona)
        this.guardar()
    }

    leer(id: number) : Persona{
        return this.personas.find(p => {return p.id == id})
    }

    actualizar(entidad: Persona) {
        let entidadUpdate = this.leer(entidad.id)
        if(entidadUpdate != null){
            entidadUpdate.nombre = entidad.nombre
            entidadUpdate.fechaNacimiento = entidad.fechaNacimiento
            entidadUpdate.estaCasado = entidad.estaCasado
        }

        this.guardar()
    }

    eliminar(id: number): boolean {
        const existe : boolean = this.personas.some(p => p.id == id)
        if(existe){
            this.personas = this.personas.filter(p => p.id != id)
            this.guardar()
        }

        return existe
    }
}

export default new PersonaDAO()


