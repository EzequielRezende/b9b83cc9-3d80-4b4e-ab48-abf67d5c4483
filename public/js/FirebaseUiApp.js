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
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      }
    ],
    /*'signInOptions2': [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        clientId: CLIENT_ID
      },
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true,
      }
    ],*/
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
  // apos login
  user.getIdToken().then(async function(token) {
    window.token = token;
    var firebaseui_container = document.getElementById('firebaseui-container');
    document.getElementById('btn-login').style.display = 'none';
    document.getElementById('sign-out').style.display = 'block';
    //window.location="/home.html"
    if(firebaseui_container){ firebaseui_container.innerHTML=""; }
    
    
    apiRequest(urlApi+"usuario/login",(error, data)=>{
      try {
        if(data.message == "Sucess"){
          startSocket(token); // o socket so é conetctado pos ter o token de login
        }else if(data.message =="cadastroInconpleto"){
          var url = window.location.origin+"/cadastro.html";
          loadContent(false, url);
        }
        console.log(data);
      }catch (error) {}
    }, 'GET', null);


  }).catch(function(error) {
    console.error(error);
  });

};

var handleSignedOutUser = function() {
  //quando nao logado
  var divUserInfo = document.getElementById('user-info');
  var btSignOut  = document.getElementById('sign-out');
  var firebaseui_container = document.getElementById('firebaseui-container');

  if(divUserInfo){ divUserInfo.style.display = 'none';}
  if(btSignOut)  { btSignOut.style.display = 'none';}
  
  document.getElementById('user-signed-in').style.display = 'none';
  document.getElementById('btn-login').style.display = 'block';
  if(firebaseui_container){
    ui.start('#firebaseui-container', getUiConfig());
  }
};

firebase.auth().onAuthStateChanged(function(user) {
  user ? handleSignedInUser(user) : handleSignedOutUser();
});


window.addEventListener('load', function() {
  window.User = function(){
    return firebase.auth().currentUser
  }

  var ckeckLoginStatus = setInterval(()=>{
    if(!window.User()){
        handleSignedOutUser();
    }
  }, 50000);

  document.getElementById('sign-out').addEventListener('click', function() {
    firebase.auth().signOut();
  });

});


