const adrian = {
    nombre: "Adrian",
}

const carolina = {
    nombre: "Carolina",
    apellido: "Eguez",
};

const adrianCarolina = {
    ...carolina,
    ...adrian,
};

console.log('adrianCarolina', adrianCarolina)

const arregloUno = [1, 2, 3];
const arregloDos = [4,5,6];

const superArreglo = [...arregloUno, ...arregloDos]