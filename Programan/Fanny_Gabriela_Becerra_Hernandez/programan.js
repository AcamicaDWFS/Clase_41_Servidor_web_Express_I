const express = require("express"),
    bodyParser = require('body-parser'),
    app = express(),
    port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Inicializamos el Server en el puerto 8080
app.listen(port, () => {
    console.log(`El servidor está inicializado en http://localhost:${port}/`);
});

let telefono = {
        id: '',
        nombre: '',
        modelo: ''
    },

    respuesta = {
        error: false,
        codigo: 200,
        mensaje: ''
    };

app.get('/', function(req, res) {
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Home'
    };
    res.send(respuesta);
});

app.post('/telefonos/', function(req, res) {
    if (!req.body.nombre || !req.body.modelo || !req.body.id) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'El campo nombre, modelo, id son requeridos'
        };
    } else {
        if (telefono.nombre !== '' || telefono.modelo !== '' || telefono.id !== '') {
            respuesta = {
                error: true,
                codigo: 503,
                mensaje: 'El telefono ya fue creado anteriormente'
            };
        } else {
            telefono = {
                id: req.body.id,
                nombre: req.body.nombre,
                modelo: req.body.modelo
            };
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: '¡Telefono creado!',
                respuesta: telefono
            };
        }
    }
    res.send(respuesta);
});

app.get('/telefonos/:id', function(req, res) {
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: ''
    };

    if (telefono.nombre === '' || telefono.modelo === '' || telefono.id === '') {
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: '¡El telefono no ha sido creado aún!'
        };
    } else {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: '',
            respuesta: telefono
        };
    }
    res.send(respuesta);
});

app.delete('/telefonos/:id', function(req, res) {
    if (telefono.nombre === '' || telefono.modelo === '' || telefono.id !== parseInt(req.params.id)) {
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: '¡El telefono que intentas borrar no existe!'
        };
    } else {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: '¡Telefono eliminado exitosamente!'
        };
        telefono = {
            id: '',
            nombre: '',
            modelo: ''
        };
    }
    res.send(respuesta);
});

app.put('/telefonos/:id', function(req, res) {
    try {
        if (!req.body.nombre || !req.body.modelo) {
            respuesta = {
                error: true,
                codigo: 502,
                mensaje: 'El campo nombre, modelo son requeridos'
            };
        } else {
            if (telefono.nombre === '' || telefono.modelo === '' || telefono.id !== parseInt(req.params.id)) {
                respuesta = {
                    error: true,
                    codigo: 501,
                    mensaje: '¡El telefono no ha sido creado!'
                };
            } else {
                telefono = {
                    id: req.params.id,
                    nombre: req.body.nombre,
                    modelo: req.body.modelo
                };
                respuesta = {
                    error: false,
                    codigo: 200,
                    mensaje: '¡Infomración del telefono actualizada!',
                    respuesta: telefono
                };
            }
        }
    } catch (error) {
        respuesta = {
            error: false,
            codigo: 500,
            mensaje: 'Error en el servicio.',
            respuesta: null
        };
        console.log(error);
    }
    res.send(respuesta);
});