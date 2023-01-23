export default class Mascota{
    private _id: number
    private _nombre: string
    private _fechaNacimiento: Date
    private _estaVacunado: boolean


    constructor(id: number, nombre: string, fecha: Date, esMacho: boolean) {
        this._id = id;
        this._nombre = nombre;
        this._fechaNacimiento = fecha;
        this._estaVacunado = esMacho;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get nombre(): string {
        return this._nombre;
    }

    set nombre(value: string) {
        this._nombre = value;
    }

    get fechaNacimiento(): Date {
        return this._fechaNacimiento;
    }

    set fechaNacimiento(value: Date) {
        this._fechaNacimiento = value;
    }

    get estaVacunado(): boolean {
        return this._estaVacunado;
    }

    set estaVacunado(value: boolean) {
        this._estaVacunado = value;
    }
}