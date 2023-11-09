// /root/backend/api/index.js
const Server = require('../modulos/Server');
const Api = require('./Api');



const server = new Server();
server.app.use('/api', Api.routes);

server.start()