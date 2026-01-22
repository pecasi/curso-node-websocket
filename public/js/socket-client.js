console.log('Socket client running');

// Referencias a los elementos del DOM
const serverStatusOnline = document.querySelector('#server-status-online');
const serverStatusOffline = document.querySelector('#server-status-offline');
const socketid = document.querySelector('#socket-id');
const messageForm = document.querySelector('#message-form');
const txtMessage = document.querySelector('#txt-message');
const btnSend = document.querySelector('#btn-send');
const btnSubmit = document.querySelector('#btn-submit');
const btnSendPrivate = document.querySelector('#btn-send-private');

// Conexión al servidor de WebSocket
const socket = io();

socket.on('connect', () => {
    socketid.innerHTML = socket.id;
    serverStatusOnline.style.display = 'inline';
    serverStatusOffline.style.display = 'none';
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    socketid.innerHTML = socket.id;
    serverStatusOnline.style.display = 'none';
    serverStatusOffline.style.display = 'inline';
    console.log('Disconnected from server');
});

// Example of sending a message to the server
socket.emit('message', 'Hello from client!');

// Example of receiving a message from the server
socket.on('message', (data) => {
    console.log('Message from server:', data);
});

socket.on('privatemessage', (data) => {
    console.log('Private message from server:', data);
});

btnSend.addEventListener('click', () => {
    const payload = {
        message: txtMessage.value,
        socketid: socket.id,
        date: new Date().getTime()
    };

    console.log('Button clicked message', payload);
    socket.emit('message', payload, (result) => {
        console.log('Message sent to server', result);
    });
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const payload = {
        message: txtMessage.value,
        socketid: socket.id,
        date: new Date().getTime()
    };

    console.log('Form submitted message', payload);
    socket.emit('message', payload, (result) => {
        console.log('Message sent to server', result);
    });        
}); 

btnSendPrivate.addEventListener('click', () => {
    const payload = {
        message: txtMessage.value,
        socketid: socket.id,
        date: new Date().getTime()
    };
    
    console.log('Button clicked private message', payload, socket.id);
    socket.emit('privatemessage', payload, (result) => {
        console.log('Private message sent to server', result);
    });
}); 