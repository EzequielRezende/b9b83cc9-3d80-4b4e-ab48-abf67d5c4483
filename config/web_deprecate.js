// ./root/config/web.js 
const admin		 = require('firebase-admin');
const express 	 = require('express');
const app 		 = express();
const serverHttp = require('http').createServer(app);
const path		 = require('path');



var serviceAccount = require("./key/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseAuth = admin.auth();

const webConfig = {
  port: 3000,  // Porta de escuta  do node
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir todas as origens (em produção, defina a origem permitida)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');


  next();
});

// Configurações do aplicativo Express.js para servir paginas html
app.use(express.static(__dirname + '/../public')); // Serve arquivos estáticos na pasta 'public'
app.use((req, res, next) => {
	const indexHtml = path.join(__dirname, '/../public/index.html');
  	res.status(404).sendFile(indexHtml, (err) => {
	    if (err) {
	      	res.status(500).send('Erro interno do servidor');
	    }
	 });
});

/*app.use((req, res, next) => {
  const indexHtml = path.join(__dirname, '/../public/index.html');
  	if (!res.headersSent) {
	  	res.sendFile(indexHtml, (err) => {
	    	if (err) {
	      	// Se ocorrer um erro ao enviar o arquivo, trate-o aqui
	      	// Por exemplo, você pode retornar um erro 500 Internal Server Error
	      	res.status(500).send('Erro interno do servidor');
	    }
	  });
	} else{
		 next();
	}
});
*/
const port = process.env.PORT || webConfig.port; // Porta em que o servidor vai ouvir

serverHttp.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = {app, serverHttp, webConfig, admin};