function soloNumeros(a, b, c){
    return a - b + c;
}

function soloLetras(a, b, c){
    console.log(a, b, c);
}

function funcionNombrada(){

}

const funcionSinNombre1 = function(){};
var funcionSinNombre2 = function(){};
let funcionSinNombre3 = function(){};

[].forEach(function(){});
funcionSinNombre1();
funcionSinNombre2();
funcionSinNombre3();

const funcionFatArrow1 = () => {};
let funcionFatArrow2 = () => {};
var  funcionFatArrow3 = () => {};

[].forEach(() => {})
funcionFatArrow1();
funcionFatArrow2();
funcionFatArrow3();

const funcionFatArrow4 = () => {};
const funcionFatArrow5= parametro => {return parametro + 1};
function sumarNumeros(...todosNumeros){
    let total = 0;
    todosNumeros.forEach(
        (valor)
    )
}
