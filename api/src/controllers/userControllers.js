const Mysql = require('../../../modulos/Mysql');

module.exports = {
  getTime: async (req, res) => {
    try {
      const time = await Mysql.query('select now() as time;');
      res.json(time);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao realizar consulta.' });
    }
  },


  getAllProfissionais: async (req, res) => {
    try {
      let limit = 15; // Valor padrão
      if (req.query.limit && req.query.limit >= 5 && req.query.limit <=50){// limit nao pode ser <5 ou >50, defaut sera usado.
        limit = parseInt(req.query.limit, 10);
      }

      sql = 'select * from USUARIO where PRESTADOR = 1 limit ?;';
      const users = await Mysql.query(sql, [limit]);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
  },

  searchProfissionais: async (req, res) => {
    try {
      let limit = 15; // Valor padrão
      if (req.query.limit && req.query.limit >= 5 && req.query.limit <=50){// limit nao pode ser <5 ou >50, defaut sera usado.
        limit = parseInt(req.query.limit, 10);
      }

      if (!req.query.queryText){
        throw new Error('queryText is required.');
      } else{
        queryText = `%${req.query.queryText}%`
      }

      //essa consulta é muito mais complexa que isso, deve agauardar assistencia do DataBase-Mem
      sql = `select * from CATEGORIA where NOME like ?;`;
      const users = await Mysql.query(sql, queryText);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
  },

  getProfissionalById: async (req, res) => {
    try {
      if (!req.query.idProfissional){
        throw new Error('idProfissional is required.');
      }

      //essa consulta é muito mais complexa que isso, deve agauardar assistencia do DataBase-Mem
      sql = 'select * from USUARIO where ID_USUARIO = ?;';
      const users = await Mysql.query(sql, [req.query.idProfissional]);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
  },

   cadastroUsuario: async (req, res) => {
    try {
      if (!req.body.dataUser){
        throw new Error('dataUser is required.');
      }

      //essa consulta é muito mais complexa que isso, deve agauardar assistencia do DataBase-Mem
      sql = 'insert into USUARIO';
      //const users = await Mysql.query(sql, [req.query.idProfissional]);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
  },



  // Implemente as demais funções do CRUD aqui usando mysqlquery
};