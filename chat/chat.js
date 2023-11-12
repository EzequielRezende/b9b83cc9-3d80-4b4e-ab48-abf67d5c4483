// chat.js
const {ChatController}  = require('./controllers/chatController');
const {UsersController} = require('./controllers/usersController');
const auth 				= require('../middlewares/authentication');
const Mysql     	    = require('../modulos/Mysql');



class Chat {// para instancia o chat e necessarios ennviar um objet socket.io instanciado
	constructor(mySocket) {
		this.socket = mySocket;
		this.Controller = new ChatController();
		this.Controller.Users = new UsersController();
	}

	init(){
		console.log("Serviço de Chat com Socket.io iniciado");
		this.socket.io.on('connection', (socket) => {
			// Aguarda o evento de login para add o usuário da lista de usuários online
	    	console.log('A New User Connected id: ', socket.id);
	    	const token =  socket.handshake.headers.authorization;
	    	auth.tokenValidate(token).then(decodedToken => {
	            if(decodedToken){
	            	const sql = `
						SELECT CHAT.*, MAX(MENSAGENS.DATA_ENVIO) AS DATA_MENSAGEM_MAIS_RECENTE
						FROM CHAT
						LEFT JOIN MENSAGENS ON CHAT.ID_CHAT = MENSAGENS.ID_CHAT
						WHERE CHAT.ID_USUARIO_EMPREGADOR = "${decodedToken.uid}" OR CHAT.ID_USUARIO_CONTRATADO = "${decodedToken.uid}"
						GROUP BY CHAT.ID_CHAT
						ORDER BY DATA_MENSAGEM_MAIS_RECENTE DESC
						LIMIT 25 `;

        	    	Mysql.select("USUARIO", ["count(*) as login"],`ID_USUARIO='${decodedToken.uid}'`).then(result=>{
        	    		if(result && result[0].login>0){
			 	       		this.Controller.Users.new(socket, decodedToken);
					 		socket.emit('userLogin', "success");
			 	       	}else{
					 		socket.emit('userLogin', "userNotRegistered");
					 		socket.disconnect(true);
			 	       	}
        	    	});

        	    	Mysql.query(sql).then((result)=>{
        	    		socket.emit('chatList', result);
        	    	});

		 		} else {
		 			socket.emit('userLogin', "loginFailed");
		 			socket.disconnect(true);
		 		}
			});

		  	// Encaminha todos os eventos do socket para um gestor de gatilho
			socket.on('event', (event) => {
				event.socket = socket;
				this.Controller.event(event.type, event);
			});

		  	socket.on('disconnect', () => {
		    	console.log('A User disconnected id: ', socket.id);
		    	// Remove o usuário da lista de usuários online
		    	this.Controller.removeUser(socket.id);
		  	});

		    socket.on('userLogin', (event) => {
		    	console.log("evento desativado");	
	    	});
		});
	}
}
//sql = `SELECT * FROM CHAT WHERE ID_USUARIO_EMPREGADOR="${decodedToken.uid}" or ID_USUARIO_CONTRATADO="${decodedToken.uid}" LIMIT 25`
module.exports = Chat;
