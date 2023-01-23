const fs = require('fs');

// 06-ejemplo.txt -> Hola

console.log('PRIMERO')
console.log('SEGUNDO')

fs.readFile('./06-ejemplo.txt', 'utf-8',
    (errorLecturaPrimerArchivo, contenidoPrimerArchivo) => {
        if(errorLecturaPrimerArchivo){
            console.log('ERROR LEYENDO ARCHIVO', errorLecturaPrimerArchivo);
        }else{
            console.log('Contenido: ', contenidoPrimerArchivo);
        }
        console.log('SEGUNDO');
    });

fs.writeFile('./06-nuevo-archivo.txt', "contenido", erroEscritura => {});

