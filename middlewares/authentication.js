// ./root/middlewares/authentication.js
// ./root/middlewares/authentication.js
const Mysql = require('../modulos/Mysql');

const admin = require('firebase-admin');
var serviceAccount = require("./key/serviceAccountKey.json");

class Authentication {
  constructor() {
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    });
    const firebaseAuth = admin.auth();
  }

  validate = async (req, res, next) => {
    const token = req.header('Authorization');
    const decodedToken = await this.tokenValidate(token);

    if (decodedToken) {
      req.user = decodedToken;
      const sql=`select ID_USUARIO from USUARIO where ID_USUARIO="${req.user.uid}"`;
      const result = await Mysql.query(sql);
      console.log(result.length);
      if(result.length==0){
        return res.status(200).json({ message: 'cadastroInconpleto' });
      }
      next();
    } else {
      return res.status(200).json({ error: 'Usuário não autenticado!' });
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