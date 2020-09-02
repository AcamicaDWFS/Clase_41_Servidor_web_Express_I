const express = require("express");
const bodyParser = require('body-parser');
const { captureRejectionSymbol } = require("events");
const app = express();
let jsonData = require('./paises.json');

console.log(jsonData);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Inicializamos el Server en el puerto 3000
app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});

//Inicializamos un Objeto Pais 
let pais = {
    id: '',
    nombre: '',
    habitantes: ''
};

//Inicializamos un Objeto respuesta
let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

//Creamos un metodo Get raiz como punto de inicio
app.get('/', function (req, res) {
    //Creamos la respuesta
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Punto de inicio'
    };
    res.send(respuesta);
});

//Creamos el metodo Post para crear el pais
app.post('/paises/', function (req, res) {
    console.log(req.body.id);
    console.log(req.body.nombre);
    console.log(req.body.habitantes);
    if (!req.body.nombre || !req.body.habitantes || !req.body.id) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'El campo nombre, habitantes, id son requeridos'
        };
    } else {
        if (pais.nombre !== '' || pais.habitantes !== '' || pais.id !== '') {
            respuesta = {
                error: true,
                codigo: 503,
                mensaje: 'El pais ya fue creado'
            };
        } else {

            //Si el pais NO existe, lo creamos y generamos la respuesta
            pais = {
                id: req.body.id,
                nombre: req.body.nombre,
                habitantes: req.body.habitantes
            };
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'pais creado',
                respuesta: pais
            };
        }
    }
    //Imrpimimos respuesta
    res.send(respuesta);
});

//Creamos otro metodo Get para ver el pais
app.get('/paises/:id', function (req, res) {
    //Inicializamos la respuesta
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: ''
    };

    if (pais.nombre === '' || pais.habitantes === '' || pais.id === '') {
        //Si el pais NO exite modificamos la respuesta
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: 'El pais no ha sido creado'
        };
    } else {
        //Si el pais SI existe generamos la respuesta
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'respuesta del pais',
            respuesta: pais
        };
    }
    // Imprimimos respuesta
    res.send(respuesta);
});

//Creamos el metodo Delete para eliminar el pais
app.delete('/paises/:id', function (req, res) {
    //si no existe el Pais 
    if (pais.nombre === '' || pais.habitantes === '' || pais.id !== parseInt(req.params.id)) {
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: 'El pais no ha sido creado'
        };
    } else {
        //Si hay un pais creado, lo eliminamos
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'pais eliminado'
        };
        pais = {
            id: '',
            nombre: '',
            habitantes: ''
        };
    }
    //Imrpimimos respuesta
    res.send(respuesta);
});

//Creamos el metodo Put para Actualizar el pais
app.put('/paises/:id', function (req, res) {
    try {
        if (!req.body.nombre || !req.body.habitantes) {
            respuesta = {
                error: true,
                codigo: 502,
                mensaje: 'El campo nombre, habitantes son requeridos'
            };
        } else {

            //Si NO tenemos un pais creado para modificar
            if (pais.nombre === '' || pais.habitantes === '' || pais.id !== parseInt(req.params.id)) {
                respuesta = {
                    error: true,
                    codigo: 501,
                    mensaje: 'El pais no ha sido creado'
                };
            } else {

                //Si el pais SI existe, lo actualizamos y generamos la respuesta
                pais = {
                    id: req.params.id,
                    nombre: req.body.nombre,
                    habitantes: req.body.habitantes
                };
                respuesta = {
                    error: false,
                    codigo: 200,
                    mensaje: 'pais actualizado',
                    respuesta: pais
                };
            }
        }
    } catch (error) {
        respuesta = {
            error: false,
            codigo: 500,
            mensaje: 'Server error',
            respuesta: null
        };
        console.log(error);
    }

    //Imrpimimos respuesta
    res.send(respuesta);
});