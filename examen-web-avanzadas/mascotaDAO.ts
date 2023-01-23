import Mascota from "./mascota.js";
import DAO from "./DAO.js";
import personaDAO from "./personaDAO.js";
export class MascotaDAO extends DAO<Mascota>{
    private mascotas: Mascota[]
    constructor(mascotas: Mascota[]) {
        super();
        this.mascotas = mascotas
    }
    actualizar(entidad: Mascota) {
        this.eliminar(entidad.id)
        this.crear(entidad)
    }

    crear(entidad: Mascota) {
        this.mascotas.push(entidad)
        this.guardar()
    }

    eliminar(id: number): boolean {
        const i : number = this.mascotas.findIndex(p => p.id == id)
        if(i != -1){
            this.mascotas.splice(i, 1)
            this.guardar()
        }
        return i != -1
    }

    leer(id: number): Mascota {
        return this.mascotas.find(p => {return p.id == id});
    }

    guardar(){
        personaDAO.guardar()
    }
}