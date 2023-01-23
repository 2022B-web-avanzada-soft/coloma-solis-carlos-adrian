class Persona{
    public nombre: string;
    public apellido: string
    static nombreReferencial: string = 'Humano';
    protected nombreYApellido = ''; // Ducl TYpiing

    constructor(nombreParametro: string, apellidoParametro: string){
        this.nombre = nombreParametro;
        this.apellido = apellidoParametro;
        this.nombreYApellido = nombreParametro + ' ' + apellidoParametro;
    }

    private mostrarNombreApellido(): string{
        return this.nombreYApellido
    }
}

class Usuario extends Persona{
    constructor(
        nombreParametro: string,
        apellidoParametro: string,
        public cedula: string,
        public estadoCivil: string,
    ){
        super(nombreParametro, apellidoParametro);
        this.cedula;
        this.estadoCivil;
    }
}

const adrian = new Usuario('Adrian', 'Egue', '0202445946', 'soltero')