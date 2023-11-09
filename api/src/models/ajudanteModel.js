const mysql = require('./mysql'); // Importe a nova classe Mysql

class AjudanteModel {
  async getAllAjudantes() {
    try {
      const ajudantes = await mysql.select('AJUDANTE', ['ID_AJUDANTE', 'PRECO', 'DESCRICAO', 'ID_SERVICO'], '1=1');
      return ajudantes;
    } catch (error) {
      throw error;
    }
  }

  async createAjudante(ajudanteData) {
    try {
      const result = await mysql.insert('AJUDANTE', ajudanteData);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Outras funções relacionadas ao modelo de ajudante

}

module.exports = new AjudanteModel();