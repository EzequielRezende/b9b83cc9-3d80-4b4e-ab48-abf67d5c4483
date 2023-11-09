// ./root/chat/index.js
const Server = require('../modulos/Server');
const Mysql = require('../modulos/Mysql');
const Socket = require('../modulos/socket'); // Importe o objeto socket_io
const Chat = require('./chat'); // Importe o módulo do chat

const server 	= new Server();
server.socket	= new Socket(server.httpServer);// instancia o socket.io, requer um objet serverhtto configurado 
server.chat		= new Chat(server.socket); // Instancia o chat, requer um objeto socket.io configurado

server.chat.init();
server.start()