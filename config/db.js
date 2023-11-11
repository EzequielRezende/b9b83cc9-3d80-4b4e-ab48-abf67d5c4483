const os = require('os'); // Importa o módulo 'os' para obter informações sobre o sistema operacional

let dbConfig;

if (os.platform() === 'win32') {
  // Configuração para o ambiente Windows
  dbConfig = {
    host: 'node151598-env-0144942.mircloud.us',
    port: 11067,
    user: 'root',
    password: 'Cyb4K3qQQW',
    database: 'EUNASERVICE',
    connectionLimit: 64,
    waitForConnections: true,
  };
} else if (os.platform() === 'linux') {
  // Configuração para o ambiente Linux
  dbConfig = {
    host: '10.5.4.104',
    port: 3306,
    user: 'root',
    password: 'Cyb4K3qQQW',
    database: 'EUNASERVICE',
    connectionLimit: 64,
    waitForConnections: true,
  };
}



module.exports = dbConfig;