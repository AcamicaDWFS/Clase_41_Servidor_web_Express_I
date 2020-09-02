let list = [];

class Phone {
    constructor( id, modelo, precio, ram, almacenamiento, camara ) {
        this.id = id;
        this.modelo = modelo;
        this.precio = precio;
        this.ram = ram;
        this.almacenamiento = almacenamiento;
        this.camara = camara;
    }
}

function insert( data ) {
    let cel = new Phone( parseInt(data.id), data.modelo, parseInt(data.precio), parseInt(data.ram), parseInt(data.almacenamiento), parseInt(data.camara) );
    list.push( cel );
}

function initList () {
    let initData = {
        id : 0,
        modelo: 'sde',
        precio: 3000,
        ram: 2,
        almacenamiento: 32,
        camara: 5
    }
    for( let i = 0; i < 10; i++ ) {
        if ( i > 0 ) {
            initData.id += 1;
            initData.modelo = initData.modelo + i;
            initData.precio += 1000;
            initData.ram += 2;
            initData.almacenamiento += 32;
            initData.camara += 5;
        }
        insert( initData );
    }
}

function updatePhone ( id, data ) {
    let index = list.findIndex( phone => phone.id === parseInt( id) );
    const before = JSON.stringify( list.slice( index, index + 1 ) );
    for( let info in list[index] ) {
        if( info in data ) {
            list[ index ][ info ] = parseInt( data[ info ] );
        }
    }
    return [ JSON.parse(before), list[index] ];
}

function deletePhone ( id ) {
    let index = list.findIndex( phone => phone.id === parseInt( id) );
    list.splice(index, 1);
}

initList();

module.exports = {
    list,
    Phone,
    insert,
    deletePhone,
    updatePhone
}
