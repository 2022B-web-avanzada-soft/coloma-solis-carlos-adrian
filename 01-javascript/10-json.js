const arregloUsuarios = [
    {
        id:1,
        nombre:'Adrian',
    }
];

const arregloGurdado = JSON.stringify(arregloUsuarios)

const usuario = {
    id: 1,
    nombre: 'Adrian'
};

const arregloRestaurado = JSON.parse(arregloGurdado)
