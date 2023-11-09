// ./UsersController.js
const { User         } = require('../models/userModel');
const { Chat         } = require('../models/chatModel');
const { Message      } = require('../models/messageModel');
const { MessageQueue } = require('./messageQueue')
const Mysql            = require('../../modulos/Mysql');





class UsersController {
  constructor() {
    this.Users = new Map();
  }

  // adiciona novo usuario/ novo user logado
  new(soket,token){
    const user = new User(soket, token);
    this.Users.set(user.idUsuario, user);  }

  //verifica se o usuario esta logado no chat
  has(idUsuario){
    return this.Users.has(idUsuario)
  }

  // remove um usuario que foi desconectado
  delete(idUsuario){
    this.Users.delete(idUsuario);
  }

/*  // lista todos os chat's que este usuario participa
  listChat(idUsuario){ // converter userSocketId em id_usuario para fazer a consulta
    id_Usuario = this.Users[idUsuario].id_Usuario;
    result = Mysql.select("Chat", "*", "`ID_USUARIO_EMPREGADOR`=${id_Usuario} or `ID_USUARIO_CONTRATADO`=${id_Usuario}")
  }
*/


  isOnline(userSocketId) {
    if(this.Users.has(userSocketId)){
      return 1;
    }else{
      return 0;
    }
  }
}

module.exports = {UsersController};

