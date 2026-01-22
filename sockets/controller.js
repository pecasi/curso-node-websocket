
const socketController = (socket) => {
    console.log('Cliente conectado', socket.id);

    socket.emit('message', 'Bienvenido al servidor de WebSocket');

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    socket.on('event', (data) => {
        console.log('Evento recibido:', data);
    });
            
    socket.on('message', (data, callback) => {
        try {
        console.log('Mensaje recibido:', data);
        socket.broadcast.emit('message', data);

        if (callback) {
            callback({
                socketid: data.socketid,
                message: 'Mensaje privado enviado correctamente',
                date: new Date().getTime()
            });
        }
        else {
            console.warn('No se proporcionó función de callback para el mensaje recibido');
        }
    } catch (error) {
        console.error('Error handling message event:', error);  
    }
    });

    socket.on('privatemessage', (data, callback) => {
        try {
            console.log('Mensaje privado recibido:', data);
            socket.emit('privatemessage', data); 
            
            if (callback) {
                callback({
                    socketid: data.socketid,
                    message: 'Mensaje privado enviado correctamente',
                    date: new Date().getTime()
                });
            } else {
                console.warn('No se proporcionó función de callback para el mensaje privado recibido');
            }
        } catch (error) {
            console.error('Error sending private message:', error);
        }           
    });
}

module.exports = {
    socketController
};