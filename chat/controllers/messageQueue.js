// ./root/chat/controller/messageQueue.js
const {MessagePackage} = require('../models/messagePackage');
const Mysql = require('../../modulos/Mysql');



class MessageQueue {
  constructor(maxLinesInsert) {
    this.maxLinesInsert = 25      // maximo de mensagens na fila para gravar em banco
    this.timeOutPackage = 5       // tempo maximo que um pacote fica aberto, em segundos, se houver alguma msg
    this.packages       = new Map();     // lista de pacotes de mensagens ainda nao gravadas
    this.cont = 0;
    this.newPackage(); 
  }

  async newPackage() { // cria um pacote que recebe mensagens
    const mPackage = new MessagePackage(this);
    this.packages.set(mPackage.id, mPackage);   // Armazena o pacote no mapa com um ID único
    this.activePackage = mPackage;              // Atualiza o último pacote criado
    console.log("New pack ", mPackage.id);          
  }

  deletePackage(packageId) {// destroi um pacote
    this.packages.delete(packageId); // Remove o pacote do mapa usando o ID
    if (this.packages.has(packageId)){// foi deletado?
      return false;
    }else{
      return true;
    }
  }

  // Adicione a mensagem ao último pacote instanciado, ele eta aberto e aceitando mensagens
  addMessage(message) {
    const activePackage = this.activePackage;
    if(activePackage && activePackage.open == true && activePackage.size()<this.maxLinesInsert){ //verifica se o pacote realmente existe e esta aberto
       activePackage.messages.push(message); // adiciona a mensagem ao pacote
    } else{ // se o pacote nao existir, estiver fechado, ou estiver cheio
      this.newPackage(); 
      this.addMessage(message);// rechama essa função para add a mensagem ao novo pacote
    }
  }

  closePackage(packageId){//fecha o pacote atual e solicita a gravação de suas mensagens
    const mPackage = this.packages.get(packageId);
    if(mPackage.size()==0){ // se o pacote estiver vazio, aguarda por mensagens
      return;
    }

    clearInterval(mPackage.interval);// desativa a contagem do tempo de vida do pacote
    mPackage.open  = false; //fecha o pacote
    const values = [];
    const keys = ["ID_CHAT", "ID_USUARIO", "MENSAGEM", "STATUS", "DATA_ENVIO"]

    //obtem todos as mensagens do pacote
    for (const message of mPackage.messages) {  // para cada mensagem no pacote
      values.push(message.getData(keys)); // Obtém  os dados da mensagem, keys sao os atributos requeridos
    }
    if(this.RecordingMessages(values)){ // envia as mensagem para gravação em banco de dados, sucess->
      if(!this.deletePackage(packageId)){ // destroi o pacote de mensages
          console.log("Erro ao deletar package id:", packageId);
      }   //definir uma politica de segurança para que se muitos pacotes nao forem excluidos nao 
          //ocorrer estouro de memoria do servidor
    } else{
      console.log("Erro ao gravar um pacote de mensagens")
      //aqui devera ser criado um mecanismo secundario para gravar essas mensagens em arquivo
      //afim de nao perder informações e nao interromper o serviço de comunicação
    }
}


  // grava as mensagens no banco de dados
  RecordingMessages(values){
    //this.cont = this.cont+values.length;
    //console.log("gravando: ", values.length, "gravados: ", this.cont);
    Mysql.insert("MENSAGENS", values);
    return true;
  }
}

module.exports = { MessageQueue };










































/*const { Message } = require('../models/messageModel');

class MessageQueue {
  constructor(MysqlQuery) {
    this.maxInserts = 10; // Defina o número máximo de inserções em lote aqui
    this.mysqlQuery = MysqlQuery;
    this.queue      = [];
  }

  enqueue(message) {
    this.queue.push(message);
  }

  async processQueue() {
    if (!this.isWriting && this.queue.length > 0) {
      this.isWriting = true;

      // Array para armazenar os valores dos campos de cada mensagem
      const values = [];
      
      // Obtenha automaticamente os nomes das colunas da classe Message
      const columnNames = Object.keys(new Message());

      while (this.queue.length > 0 && values.length < this.maxInserts) {
        const message = this.queue.shift(); // Pega a primeira mensagem da fila
        const messageData = columnNames.map(column => message.getField(column)); // Obtém os dados da mensagem
        values.push(messageData);
      }

      try {
        // SQL de inserção em lote
        const sql = `INSERT INTO tabela (${columnNames.join(', ')}) VALUES ?`;

        // Execute a consulta em lote usando a classe MysqlQuery
        await this.mysqlQuery.query(sql, [values]);

        console.log('Inserção em lote bem-sucedida.');
      } catch (error) {
        // Lida com erros de consulta, se necessário
        console.error('Erro ao inserir em lote:', error);
      } finally {
        this.isWriting = false;
      }
    }
  }

  // Método para parar o intervalo de verificação (chame quando não precisar mais da fila)
  stopQueueInterval() {
    clearInterval(this.checkQueueInterval);
  }
}

// Uso da classe MessageQueue
const messageQueue = new MessageQueue();

// Exemplo de uso da classe Message para criar uma mensagem
const message = new Message(1, 'SenderName', 'RecipientName', 'Delivered', false, new Date());

// Quando uma nova mensagem chegar via Socket.IO, enfileire-a
socket.on('newMessage', (message) => {
  messageQueue.enqueue(message);
});

*/