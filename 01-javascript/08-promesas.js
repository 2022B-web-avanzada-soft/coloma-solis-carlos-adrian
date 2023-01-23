const fs = require('fs')

function leerArchivo(path){
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (error, contenido) => {
            if(error){
                reject(error);
            }else{
                resolve(contenido);
            }
        })
    });
}

function escribirArchivo(path, contenidoArchivo){
    return new Promise((resolve, reject) => {
        fs.writeFile(path, contenidoArchivo, error => reject(error));
        resolve(contenidoArchivo);
    });
}
function ejercicio08(path, contenidoArchivo){
    return leerArchivo(path)
        .then(algo => {
            return escribirArchivo(path, algo + contenidoArchivo);
        })
}


ejercicio08('06-ejemplo.txt', ' :) lo logramos!')
.then(contenido => console.log(contenido))

//ASYNC AWAIT
async function asyncAwaitUno(path, nuevoContenido){
    //Si sabemos que en la promesa PUEDE haber un reject, usamos try y catch
    try{
        const respuestaContenidoArchivoOriginal = leerArchivo(path);
        await escribirArchivo(path, respuestaContenidoArchivoOriginal + nuevoContenido);

    }catch(error){
        console.error(error)
    }
}

asyncAwaitUno('06-ejemplo.txt', 'lo logramos :d')
console.log("me ejecute")
const asyncAwaitDos = async function(){

}
const asyncAwaitDosTres = async ()=>{

}



