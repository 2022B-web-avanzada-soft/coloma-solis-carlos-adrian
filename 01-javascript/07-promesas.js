const fs = require('fs');

function promesaEsPar(numero){
    const miPrimerPromesa = new Promise(
        (resolve, reject) =>{
            if (numero % 2 == 0){
                resolve("Es par")
            }else{
                reject("no es par");
            }
        }
    );
    return miPrimerPromesa;
}

promesaEsPar(5)
.then(
    (data) => {console.log(data)}
).catch(
    (error) => {console.log(error)}
).finally(
    () => {

    }
);
