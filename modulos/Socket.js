//  ./root/config/socket.js
const socket_io    = require('socket.io');


//esta classe exige que seja enviado um elemento "serverHttp" criado a partir de ''const serverHttp = require('http').createServer(app);''
class Socket {
  constructor(serverHttp) {
    this.io = socket_io(serverHttp, {
  		//path: '/socket', // O caminho que o Socket.io usará
  		//serveClient: false, // Configuração adicional, se necessário
	});
  }

  close() {
    this.io.close(); // Método para fechar a conexão do Socket.io, se necessário
  }
}

module.exports = Socket ;