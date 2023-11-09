// ./root/index.js
const path 	 = require('path');
const express= require('express');
const Config = require('./config/config');
const Server = require('./modulos/Server');
const Socket = require('./modulos/Socket'); // Importe o objeto socket_io
const Chat   = require('./chat/chat'); // Importe o módulo do chat
const Api 	 = require('./api/Api');


const server 	= new Server();


if(Config.api) { // verifica se o serviço de API deve ser ativado
	server.app.use('/api', Api.routes);
}

if(Config.chat) { // verifica se o serviço de Chat deve ser ativado
	server.socket	= new Socket(server.httpServer);// instancia o socket.io, requer um objet serverhtto configurado 
	server.chat		= new Chat(server.socket); // Instancia o chat, requer um objeto socket.io configurado
	server.chat.init();
}

if(Config.webServer) { // verifica se o serviço de webserver para paginas .html deve ser ativado
	// Configurações do aplicativo Express.js para servir paginas html
	server.app.use(express.static(__dirname + "/public")); 				// Serve arquivos estáticos na pasta 'public'
	server.app.use('/uploads', express.static(__dirname + '/uploads')); // os arquivos de imagens enviados pelos usuarios serão disponibilizados em dominio.com/uploads, a principio os arquivos fiacarão no mesmo servidor mas posteriormente serão movido para um armazenamento externo
	server.app.use((req, res, next) => {
		const indexHtml = path.join(__dirname, './public/index.html');
	  	res.status(200).sendFile(indexHtml, (err) => {
		    if (err) {
		      	res.status(500).send('Erro interno do servidor: \n O recurso procurado naão existe!');
		    }
		 });
	});
}

server.start()