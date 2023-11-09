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
    document.getElementById('user-info').style.display = 'block';

      startSocket(token); // o socket so é conetctado pos ter o token de login
  }).catch(function(error) {
    console.error(error);
  });

};

var handleSignedOutUser = function() {
  document.getElementById('user-info').style.display = 'none';
  document.getElementById('user-signed-in').style.display = 'none';
  document.getElementById('user-signed-out').style.display = 'block';
  ui.start('#firebaseui-container', getUiConfig());
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
  }, 5000);

  document.getElementById('sign-out').addEventListener('click', function() {
    firebase.auth().signOut();
  });

});


