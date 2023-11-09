const socket = io();

    function login(token=false) { // token será usado para validar o login no servidor
      const username = document.getElementById('username').value;
      socket.emit('event', {
        "type":'userLogin',
        "data": {
          username:username, 
          token:token,
        }
      });
      console.log(socket.id);
      document.getElementById('login').style.display = 'none';
      document.getElementById('chat').style.display = 'block';
      return false;
    }

    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('sendMsg').addEventListener('submit', (event) => {
        event.preventDefault();
        const recipient = document.getElementById('recipient').value; // Adicione o destinatário
        const message = document.getElementById('message').value;
        socket.emit('event', {
          "type": "pvMessage",
          "data": {
            "recipient":recipient,
            "text":message
          }
          }); // Emita a mensagem privada
        document.getElementById('message').value = '';
      });
    });

    function renderMsg(data) {
      const chatHistory = document.getElementById('chat-history');
      const newMessage = document.createElement('div');
      const msgReceived = data.sender !== socket.id;

      newMessage.className = msgReceived ? "msgReceived" : "msgSent";
      newMessage.innerHTML = `<span>${data.sender} em ${dataHoraFormat(data.time)}</span><br>${data.text}`;
      chatHistory.appendChild(newMessage);

      if (chatHistory.scrollTop <= chatHistory.scrollHeight - (chatHistory.offsetHeight / 2)) {
        chatHistory.scrollTop = chatHistory.scrollHeight;
      }
    }

    socket.on('pvMessage', (data) => {
      renderMsg(data);
    });


    function dataHoraFormat(timeStampMysql) {
      const dataHora = new Date(timeStampMysql);
      const horas = ('0' + dataHora.getHours()).slice(-2);
      const minutos = ('0' + dataHora.getMinutes()).slice(-2);
      const dia = ('0' + dataHora.getDate()).slice(-2);
      const mes = ('0' + (dataHora.getMonth() + 1)).slice(-2);
      const ano = dataHora.getFullYear();
      const dataHoraFormatada = horas + ':' + minutos + ' ' + dia + '/' + mes + '/' + ano;
      return dataHoraFormatada;
    }