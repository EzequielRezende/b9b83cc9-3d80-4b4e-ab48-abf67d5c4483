// /root/backend/modulos/Server.js
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');


// Configuração do body-parser

class Server {
  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.port = process.env.PORT || 3000; // Porta padrão 3000

    this.configureMiddleware();
  }

  configureMiddleware() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      next();
    });
  }

  start() {
    this.httpServer.listen(this.port, () => {
      console.log(`Servidor rodando na porta ${this.port}`);
    });
  }
}

module.exports = Server;
