// models.js
const admin = require('firebase-admin');
const Mysql = require('../../modulos/Mysql');


class Chat {

	constructor(idChat=null, idAutonomo=null, idCliente=null, idServico=null) {
	    this.idChat 	= idChat;
	    this.idAutonomo = idAutonomo;
	    this.idCliente 	= idCliente;
	    this.idServico 	= idServico;
	    
	    if(!idChat) {
		    this.chatCreate(idAutonomo, idCliente, idServico);
		}else{
			this.loadChat(idChat);
		}
	}

	static async chatCreate(idAutonomo, idCliente, idServico) {
	    try {
	    	let data = {
	    		ID_AUTONOMO:idAutonomo,
	    		ID_CLIENTE:idCliente,
	    		ID_SERVICO:idServico,
	    	}
	    	this.idChat = Mysql.insert("CHAT", data) //Verificar se o retorno dessa função retorna apenas o id inserido
			this.loadChat(this.idChat);

	    } catch (error) {
	    	console.log("Erro ao criar novo chat no banco de dados");
		    throw error;
	    }
	}

	static async loadChat(idChat) {
	    try {
	    	Mysql.select("CHAT",["ID_AUTONOMO","ID_CLIENTE","ID_SERVICO"] , `ID_CHAT=${idChat}`)
	    } catch (error) {
	    	console.log("Erro ao recuperar info do banco de dados");
		    throw error;
	    }
	}
}


module.exports = {
  Chat
};