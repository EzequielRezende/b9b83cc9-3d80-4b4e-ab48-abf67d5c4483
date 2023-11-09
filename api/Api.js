// root/backend/api/api.js

//esse modulo expota apenas as rotas que estão abaixo, por qnecessidade de poder inicializar 
// apenas o serviço de api, essa parte foi parada do index.js


// Rotas da API
const routes = require('./src/routes/routes');

module.exports = {
	routes,
}