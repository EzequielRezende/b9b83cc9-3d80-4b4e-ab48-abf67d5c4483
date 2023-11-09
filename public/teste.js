/*
function getRandomMessage() {
  const messages = ["Olá!", "Como você está?", "Estou bem, obrigado.", "E você?", "Ótimo!", "Qual é a novidade?", "Nada de novo.", "Isso é ótimo.", "Tenha um bom dia!"];
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

function simulateSendingMessages() {
  const sendButton = document.querySelector('#sendMsg button[type="submit"]');
  const mensagemInput = document.querySelector('#mensagem');

  let startTime = Date.now();
  cont=0;

  const sendMessagesInterval = setInterval(() => {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - startTime) / 1000;

    if (elapsedTime >= 60) {
      clearInterval(sendMessagesInterval);
      console.log('Teste concluído.', cont);
    } else {
      const randomMessage = getRandomMessage();
      mensagemInput.value = randomMessage;
      sendButton.click();
      cont++;
    }
  }, 1); // Envie uma mensagem a cada segundo
}

// Chame a função para iniciar a simulação de envio de centenas de mensagens por minuto
// simulateSendingMessages()
*/
