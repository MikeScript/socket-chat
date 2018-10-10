var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios')
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

// Escuchar   
socket.on('connect', function() {
    console.log('conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados', resp);
    });
});

socket.on('disconnect', function() {
    console.log('Perdimos conección con el servidor');
});

socket.on('enviarMensaje', function(mensaje) {
    console.log('Servidor: ', mensaje);
});

// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Miguel',
//     mensaje: 'Hola mundo'
// }, function(resp) {
//     console.log('Respuesta server: ', resp);
// });

//Escuchar Información

socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor: ', mensaje);
});

//Escuchar cuando un usuario entra o sale del chat

socket.on('listaPersona', function(usuarios) {
    console.log('Usuarios Conectados: ', usuarios);
});


// Mensajes Privados

socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje Privado: ', mensaje);
});