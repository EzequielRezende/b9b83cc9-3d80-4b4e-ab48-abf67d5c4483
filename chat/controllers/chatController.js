// ./controller.js
const { User         } = require('../models/userModel');
const { Chat         } = require('../models/chatModel');
const { Message      } = require('../models/messageModel');
const { MessageQueue } = require('./messageQueue')
const Mysql            = require('../../modulos/Mysql');





class ChatController {
  constructor() {
    this.Users = new Map(); //por padrao é um map, mas esta sendo substituido por uma classe
    this.messageQueue= new MessageQueue();
    this.listeners   = {}; //dicionario de eventos que serão ouvidos
    this.init();
  }

  // gerador de ouvintes/gatilhos dos eventos 
  on(eventType, callback) {
    if (!(eventType in this.listeners)) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);
  }

  // disparador dos gatilhos dos eventos
  event(eventType, eventData) {
    if (eventType in this.listeners) {
      for (const callback of this.listeners[eventType]) {
        callback(eventData);
      }
    }
  }

  init(){
    // ### defina aqui os ouvintes de eventos do chat/sockete
    // ### modelo  
      //## this.on('eventName', (event)=>{});###


    this.on('pvMessage', async (event)=>{
      const msg     = new Message(event.data);
      msg.ID_USUARIO= event.socket.User.idUsuario;
      msg.STATUS    = this.Users.isOnline(msg.RECIPIENT);
      if(msg.STATUS){ // se ele estiver online, encaminha a msg pra ele via socket
        event.socket.to(this.Users.Users.get(msg.RECIPIENT).SocketId).emit('pvMessage', msg);
      }
      // quando o usuario envia uma mensagem, ele mesmo recebe uma copia da mesma como confirmação de envio
      event.socket.emit('pvMessage', msg);
      this.messageQueue.addMessage(msg);
    });

    this.on("getPrevmessage", async(event)=>{
      Mysql.select("MENSAGENS", ["*"], `ID_CHAT="${event.data.id_chat}" and DATA_ENVIO<"${event.data.timePrevMessage.replace("Z", "")}" order by ID_MENSAGEM DESC limit 10`).then((result)=>{
        
        result.forEach(message => {
          event.socket.emit('Prevmessage', message);

        });
      });
    });
  

  //#################################################################################
  }

  getMessages(idChat) {
    //essa logica sera definida no futuro
  }

  removeUser(userSocketId) {
    this.Users.delete(userSocketId);
  }

}

module.exports = {ChatController};

