const mysql = require('./mysql'); // Importe a nova classe Mysql

class ClienteModel {
  async getAllClientes() {
    try {
      const clientes = await mysql.select('CLIENTE', ['ID_CLIENTE', 'NOME', 'RG', 'CPF', 'DATA_NASCIMENTO', 'EMAIL'], '1=1');
      return clientes;
    } catch (error) {
      throw error;
    }
  }

  async createCliente(clienteData) {
    try {
      const result = await mysql.insert('CLIENTE', clienteData);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Outras funções relacionadas ao modelo de cliente

}

module.exports = new ClienteModel();