const mysql = require('./mysql'); // Importe a nova classe Mysql

class ServicoModel {
  async getAllServicos() {
    try {
      const servicos = await mysql.select('SERVICO', ['ID_SERVICO', 'PRECO', 'DESCRICAO', 'ID_AUTONOMO'], '1=1');
      return servicos;
    } catch (error) {
      throw error;
    }
  }

  async createServico(servicoData) {
    try {
      const result = await mysql.insert('SERVICO', servicoData);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Outras funções relacionadas ao modelo de serviço

}

module.exports = new ServicoModel();