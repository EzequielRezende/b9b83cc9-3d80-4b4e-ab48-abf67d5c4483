//root/chat/models/messageModel.js
class Message {
  constructor(msg) {
    const  {id_Chat, recipient, mensagem} = msg;

    //id e read podera ser implementado o uso no futuro
    this.id         = null;
    this.read       = null;
    this.ID_USUARIO = null;
    this.STATUS     = 0;
    //this.ID_CHAT    = id_Chat;
    this.DATA_ENVIO = this.dateTime();
    this.RECIPIENT  = recipient;
    this.MENSAGEM   = mensagem;
    Object.defineProperty(this, 'ID_CHAT', {
      value: id_Chat,
      enumerable: true, // Torna a propriedade enumerável
    });
  }

  dateTime(){
    const dataHora = new Date();
    // Use métodos de formatação para obter a representação da data como uma string
    const ano = dataHora.getFullYear();
    const mes = ('0' + (dataHora.getMonth() + 1)).slice(-2); // Adiciona zero à esquerda, se necessário
    const dia = ('0' + dataHora.getDate()).slice(-2); // Adiciona zero à esquerda, se necessário
    const horas = ('0' + dataHora.getHours()).slice(-2); // Adiciona zero à esquerda, se necessário
    const minutos = ('0' + dataHora.getMinutes()).slice(-2); // Adiciona zero à esquerda, se necessário
    const segundos = ('0' + dataHora.getSeconds()).slice(-2); // Adiciona zero à esquerda, se necessário
    const milissegundos = ('00' + dataHora.getMilliseconds()).slice(-3); // Adiciona zeros à esquerda, se necessário
    return `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}.${milissegundos}`;
  }

  // Método para definir valores dos campos
  setField(key, value) {
    if (this.hasOwnProperty(key)) {
      this[key] = value;
    } else {
      throw new Error(`Campo '${key}' não existe na classe Message.`);
    }
  }

  //metodo para validar os campos da mensagem
  validate(){
    return 1;
  }

  // Método para obter todos os valores dos campos em um array
  getData(keys=null) {
    keys = keys ?? Object.getOwnPropertyNames(this);

    const data = {};
    for (const key of keys) {
      if (this.hasOwnProperty(key)) {
        data[key]=this[key];
      } else{
        console.log("key nao existe: ", key);
      }
    }
    return data;
  }
}

module.exports = {Message};