const mysql = require('./mysql'); // Importe a nova classe Mysql

class AutonomoModel {
  async getAllAutonomos() {
    try {
      const autonomos = await mysql.select('AUTONOMO', ['ID_AUTONOMO', 'NOME', 'SOBRENOME', 'RG', 'CPF', 'DATA_NASCIMENTO', 'DESCRICAO', 'EMAIL'], '1=1');
      return autonomos;
    } catch (error) {
      throw error;
    }
  }

  async createAutonomo(autonomoData) {
    try {
      const result = await mysql.insert('AUTONOMO', autonomoData);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Outras funções relacionadas ao modelo de autônomo

}

module.exports = new AutonomoModel();