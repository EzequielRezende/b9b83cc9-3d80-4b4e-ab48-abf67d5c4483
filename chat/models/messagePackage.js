const { v4: uuidv4 } = require('uuid');
class MessagePackage {
  constructor(parent) {
    const self    = this;
    this.id       = uuidv4();   // Gera um UUID único
    this.open     = true;     // Aberto aceita mensagens, fechado não
    this.messages = [];   // Todas as mensagens adicionadas a esse pacote
    this.interval = setInterval(function () {
      parent.closePackage(self.id); // Fechamento automático após timeOut
    }, parent.timeOutPackage * 1000);
  }

  size() { // Retorna o número de mensagens neste pacote
    return this.messages.length;
  }
}

module.exports = { MessagePackage };