// ./root/middlewares/authentication.js
// ./root/middlewares/authentication.js

const admin = require('firebase-admin');
var serviceAccount = require("./key/serviceAccountKey.json");

class Authentication {
  constructor() {
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    });
    const firebaseAuth = admin.auth();
  }

  async validate(req, res, next) {
    const token = req.header('Authorization');
    const decodedToken = await this.tokenValidate(token);

    if (decodedToken) {
      req.user = decodedToken;
      next();
    } else {
      return res.status(401).json({ error: 'Usuário não autenticado!' });
    }
  }

  async tokenValidate(token) {
    if (!token) {
      return false;
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      return false;
    }
  }
}

module.exports = new Authentication();


/*
const { admin } = require('../config/web');

class authentication {
  constructor() {
  }
  
  async function validate  (req, res, next) => { // exclusivo para express
    const token = req.header('Authorization');
    decodedToken = tokenValidate (token);
    if (decodedToken){
      req.user = decodedToken;
      next();
    } else {
      return res.status(401).json({ error: 'Usuario não Autenticado!' });
    }

  }

  function tokenValidate (token) { 

    if (!token) {
      return false;
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      return false;
    }
  },
}*/