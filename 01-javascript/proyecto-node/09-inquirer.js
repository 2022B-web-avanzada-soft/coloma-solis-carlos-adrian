const inquirer = require('inquirer');
async function main(){

        try{
            const respuesta = await inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'apellido',
                        message: 'Ingresa Tu Nombre'
                    },
                    {name: 'edad'}
                ]);
        }catch(e){
            console.log(e)
        }

}

main();

