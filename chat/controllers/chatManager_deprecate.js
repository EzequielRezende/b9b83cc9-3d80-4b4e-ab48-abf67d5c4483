// chatManager.js
const Mysql = require('../../modulos/Mysql');

class ChatManager {
  constructor() {
    this.onlineUsers = new Map();
  }

  onMessage(message, socket) {
    const { idChat, sender, recipient, conteudo } = message;

    const delivered=this.isOnline(recipient)

    if(delivered){
      socket.to(recipient).emit('message', message)
    }
    let data = {
      CONTEUDO:conteudo,
      STATUS:delivered,
      ID_CHATI:idChat,
      D_USUARIO:sender,
    }
    
    //solicitamos a gravação da mensagem em banco de dados
    Mysql.insert("MENSAGENS", data);
  }

  getMessages(sender, recipient) {
    //essa logica sera definida no futuro
  }

  addUser(userSocketId, UserId) {
    this.onlineUsers.set(userSocketId, [UserId, 0]);
  }


  removeUser(userSocketId) {
    this.onlineUsers.delete(userSocketId);
  }

  isOnline(userSocketId) {
    return this.onlineUsers.has(userSocketId);
  }

  // esta função não sera usada no eunaservice
  generateChatID(userID1, userID2) {
    const sortedUserIDs = [userID1, userID2].sort();
    return `${sortedUserIDs[0]}_${sortedUserIDs[1]}`;
  }
}

module.exports = ChatManager;