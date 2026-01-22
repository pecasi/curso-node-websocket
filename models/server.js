const express = require('express');
var cors = require('cors')
const {socketController} = require('../sockets/controller');

class Server {
    constructor() { 
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {};

        // Middlewares
        this.middlewares();

        // Rutas de la aplicacion
        this.routes();

        //Sockets
        this.sockets();
    }

    async dbConnection() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );
        
       // Directorio publico
        this.app.use( express.static('public') );
    }

    routes() {}    
    
    sockets() {
        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;    