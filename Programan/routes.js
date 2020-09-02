const express = require( 'express' );
let lista = require( './phone' );

const router = express.Router();


function setResponse( status, code, message, text ) {
    let response;
    if( text ) {
        response = { error : status, codigo : code, descripcion : text, message };
    } else {
        response = { error : status, codigo : code, message };
    }
    return response;
}

router.get( '/', ( req, res ) => {
    res.send( setResponse( false, 200, lista.list ) );
} );

router.post( '/phones/', ( req, res ) => {
    if( req.body.id ) {
        let data = req.body;
        lista.insert( data );
        res.send( setResponse( false, 200, data, '¡Guardado Correctamente!' ) );
    } else {
        res.send( setResponse( true, 502, 'Hacen falta campos requeridos' ) );
    }
} );

router.put( '/phones/:id', ( req, res ) => {
    if( req.params.id ) {
        let data = req.body;
        [before, now] = lista.updatePhone( req.params.id, data );
        let changes = { old: before[0], new : now }
        res.send( setResponse( false, 200, changes, '¡Actualizado Correctamente!' ) );
    } else {
        res.send( setResponse( true, 502, 'El Id es Requerido' ) );
    }
} );

router.delete( '/phones/:id', ( req, res ) => {
    if( req.params.id ) {
        lista.deletePhone( req.params.id );
        res.send( setResponse( false, 200, req.params.id, '¡Eliminado Correctamente!' ) );
    } else {
        res.send( setResponse( true, 502, 'El Id es Requerido' ) );
    }
} );

module.exports = router;