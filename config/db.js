///*
//servidor de teste
const dbConfig = {
  host: 'node151598-env-0144942.mircloud.us',
  port: 11067,
  user: 'root',
  password: 'Cyb4K3qQQW',
  database: 'EUNASERVICE',
  connectionLimit: 64, // Ajuste o limite conforme necessário
  waitForConnections: true, // Aguardar se todas as conexões estiverem em uso
};

/*/   

//servidor de produção
const dbConfig = {
  host: 'node151598-env-0144942.mircloud.us', // Endereço do servidor MySQL
  port: 'port xxx',  // Porta de escuta  do MySQL
  user: 'UserXXXXXX', // Nome  de usuário do MySQL
  password: 'XXXXXXXX',  // Senha do MySQL
  database: 'eunaservice_db', // Nome do banco de dados que você deseja usar
};

//*/



module.exports = dbConfig;