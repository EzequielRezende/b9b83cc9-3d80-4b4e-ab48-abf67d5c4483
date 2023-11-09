const auth 		= require('../../middlewares/authentication');
const Mysql		= require('../../modulos/Mysql');


class User {
  constructor(socket, userData) {
    this.SocketId  = socket.id;
    this.idUsuario = userData.uid;
    socket.User    = this;
  }
}


module.exports = {
  User
};