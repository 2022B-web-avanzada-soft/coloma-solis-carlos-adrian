const arreglo = [1, 2, 3];

//FUNCIONES COMO PARAMETROS
// FIND
// enviamos una expresion -> TRUTY FALSY
// devuelve el primero que cumpla esa condicion
const respuestaFind = arreglo.find(value => {return value > 2});
console.log(respuestaFind);

const arreglo2 = arreglo.map(valor => valor + 2);
console.log(arreglo2)

let respuestaReduce = arreglo2.reduce(function(valorAcumulado, valorActual, indice){
    return (valorAcumulado + valorActual)
}, 0);

console.log(respuestaReduce)

