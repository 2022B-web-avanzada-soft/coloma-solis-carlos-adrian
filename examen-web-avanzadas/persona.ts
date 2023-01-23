import Mascota from "./mascota.js";

export default class Persona{
    get mascotas(): Mascota[] {
        return this._mascotas;
    }

    set mascotas(value: Mascota[]) {
        this._mascotas = value;
    }
    get estaCasado(): boolean {
        return this._estaCasado;
    }

    set estaCasado(value: boolean) {
        this._estaCasado = value;
    }
    get fechaNacimiento(): Date {
        return this._fechaNacimiento;
    }

    set fechaNacimiento(value: Date) {
        this._fechaNacimiento = value;
    }
    get nombre(): string {
        return this._nombre;
    }

    set nombre(value: string) {
        this._nombre = value;
    }
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    private _id: number
    private _nombre: string
    private _fechaNacimiento: Date
    private _estaCasado: boolean
    private _mascotas: Mascota[]
    constructor(id: number, nombre: string, fechaNacimiento: Date, estaCasado: boolean) {
        this._id = id;
        this._nombre = nombre;
        this._fechaNacimiento = fechaNacimiento;
        this._estaCasado = estaCasado;
        this._mascotas = []
    }

}