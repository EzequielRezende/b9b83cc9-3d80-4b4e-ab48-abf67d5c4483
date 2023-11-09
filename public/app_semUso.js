//app.js

// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// # # # abaixo se inicia as funcionalidade do chat usando Socket.io
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

function login(token=false) { // token será usado para validar o login no servidor
  socket.emit('userLogin', {
    "type":'userLogin',
    "data": {
        token:token
    }
  });
}


function startSocket(token){
  const socketUrl = `${window.location.protocol}//${window.location.host}`;
  window.socket = io(socketUrl, {
    extraHeaders: {
      Authorization: `${token}`,
    },
  });

  socket.on('pvMessage', (data) => {
    console.log(data);
    renderMsg(data);
  });


  socket.on('Prevmessage', (data) => {
    console.log("Prevmessage", data);
    renderMsg(data, false);
  });

  socket.on('chatList', (data) => {
    var goupConversas = document.getElementById("id_Chat").querySelector('optgroup[label="Conversas"]');

    while (goupConversas.firstChild) {
      goupConversas.removeChild(goupConversas.firstChild);
    }

    data.forEach(function (line) {
      recipient = (window.User().uid == line.ID_USUARIO_CONTRATADO) ? line.ID_USUARIO_EMPREGADOR : line.ID_USUARIO_CONTRATADO
      var option = document.createElement("option");
      option.value = line.ID_CHAT;
      option.textContent = line.ID_CHAT;
      option.setAttribute("data-recipient", recipient);
      goupConversas.appendChild(option);
    });
  });

  socket.on('userLogin', (data) => {
    if(data == "success"){
      var user  = window.User();
      document.getElementById('user-signed-in').style.display = 'block';
      document.getElementById('user-signed-out').style.display = 'none';
      document.getElementById('name').textContent = user.displayName;
      document.getElementById('email').textContent = user.email;
    } else if(data == "userNotRegistered"){
      //usuario nao registrado na plataforma, encaminhar para pag de cadastro
    } else {
      //Token invalido, tentar novamente
      firebase.auth().signOut();
      handleSignedOutUser();
    }
  });
}


function renderMsg(data, newmsg=true) {
  const chatHistory = document.getElementById('chat-history');
  const Message  = document.createElement('div');

  Message.setAttribute("data-time", data.DATA_ENVIO);
  const msgReceived = (data.ID_USUARIO !== window.User().uid); // verifica se a mensagem foi enciado ou recebida
  Message.className = msgReceived ? "msgReceived" : "msgSent"; // defina a classe enviada ou recebida
  Message.classList.add("message");

  Message.innerHTML = `<span>${data.ID_USUARIO} em ${dataHoraFormat(data.DATA_ENVIO)}</span><br>${data.MENSAGEM}`;

  if(newmsg){ // se for uma mensagem nova, ela sera add abaixo e rolagem auto
    //verifica se a barra de rolagem esta no limite inferior
    const isUserAtBottom = chatHistory.scrollTop + chatHistory.offsetHeight >= chatHistory.scrollHeight;
    chatHistory.appendChild(Message);
    
    if (isUserAtBottom) {// se sim, rolagem automatica
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }

  } else{ //se for uma mensagem anterior/antiga regarregada, ela sera add acima e sem auto scroll
    chatHistory.prepend(Message);
  }
}

//isso nao esta funcionando corretamente, precisa ser verificado
function loadPrevMsg(initialLoad = false) {
  const data    = document.getElementById('chat-history').querySelectorAll('.message')[0].getAttribute('data-time')
  const id_chat = document.getElementById('id_Chat').value;
  socket.emit('event', {
    "type": "getPrevmessage",
    "data": {
      "timePrevMessage": data,
      "id_chat":id_chat, 
    }
  });
}


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


window.addEventListener('load', function() {
  document.getElementById('id_Chat').addEventListener('change', (event) => {
    var recipient = event.target.selectedOptions[0].getAttribute("data-recipient");
    document.getElementById("recipient").value=recipient;
  });


  document.getElementById('chat-history').addEventListener('scroll', function(event) {
    if (event.target.scrollTop <= 0) {
    event.target.scrollTop = 1; // Impede que o usuário role para cima além do limite
    }

    if (event.target.scrollTop <= 1) {
      loadPrevMsg();
    }
  });

  document.getElementById('sendMsg').addEventListener('submit', (event) => {
    event.preventDefault();
    const recipient = document.getElementById('recipient').value;
    const mensagem = document.getElementById('mensagem').value;
    const id_Chat = document.getElementById('id_Chat').value;
    socket.emit('event', {
      "type": "pvMessage",
      "data": {
        "recipient":recipient,
        "mensagem":mensagem,
        "id_Chat":id_Chat,
      }
    });
    document.getElementById('mensagem').value = '';
  });
});

// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// # # # abaixo se inicia as configurações para login usando firebaseUI
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

function getUiConfig() {
  return {
    'callbacks': {
      'signInSuccessWithAuthResult': function(authResult, redirectUrl) {
        if (authResult.user) {
          handleSignedInUser(authResult.user);
        }
        return false;
      }
    },
    'signInFlow': 'popup',
    'signInOptions': [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        clientId: CLIENT_ID
      },
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true,
      }
    ],
    'tosUrl': 'http://localhost/',
    'privacyPolicyUrl': 'http://localhost/',
    'credentialHelper': CLIENT_ID && CLIENT_ID != 'YOUR_OAUTH_CLIENT_ID' ?
        firebaseui.auth.CredentialHelper.GOOGLE_YOLO :
        firebaseui.auth.CredentialHelper.NONE
  };
}

var ui = new firebaseui.auth.AuthUI(firebase.auth());
//ui.disableAutoSignIn();

var handleSignedInUser = function(user) {
  user.getIdToken().then(async function(token) {
      startSocket(token); // o socket so é conetctado pos ter o token de login
  }).catch(function(error) {
    console.log(error);
  });

};

var handleSignedOutUser = function() {
  document.getElementById('user-signed-in').style.display = 'none';
  document.getElementById('user-signed-out').style.display = 'block';
  ui.start('#firebaseui-container', getUiConfig());
};

firebase.auth().onAuthStateChanged(function(user) {
  user ? handleSignedInUser(user) : handleSignedOutUser();
});

document.getElementById('sign-out').addEventListener('click', function() {
  firebase.auth().signOut();
});


window.addEventListener('load', function() {
  window.User = function(){
    return firebase.auth().currentUser
  }

  var ckeckLoginStatus = setInterval(()=>{
    if(!window.User()){
        handleSignedOutUser();
    }
  }, 5000);

  document.getElementById('sign-out').addEventListener('click', function() {
    firebase.auth().signOut();
  });

});


