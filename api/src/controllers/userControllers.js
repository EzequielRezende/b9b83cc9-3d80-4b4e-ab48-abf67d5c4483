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
      if (req.params.limit && req.params.limit >= 5 && req.params.limit <=50){// limit nao pode ser <5 ou >50, defaut sera usado.
        limit = parseInt(req.params.limit, 10);
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
      if (req.params.limit && req.params.limit >= 5 && req.params.limit <=50){// limit nao pode ser <5 ou >50, defaut sera usado.
        limit = parseInt(req.params.limit, 10);
      }

      if (!req.params.queryText){
        throw new Error('queryText is required.');
      } else{
        queryText = `%${req.params.queryText}%`
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
      if (!req.params.idProfissional){
        throw new Error('idProfissional is required.');
      }

      //essa consulta é muito mais complexa que isso, deve agauardar assistencia do DataBase-Mem
      sql = 'SELECT USUARIO.*, GROUP_CONCAT(TELEFONE.numero) AS TELEFONES FROM USUARIO LEFT JOIN TELEFONE ON USUARIO.ID_USUARIO = TELEFONE.ID_USUARIO WHERE USUARIO.ID_USUARIO = "0a99b94c-c089-4900-9565-4a8281390a14" GROUP BY USUARIO.ID_USUARIO;';
      const users = await Mysql.query(sql, [req.params.idProfissional]);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
  },

   verificaCPF: async (req, res) => {
    try {
      if (!req.params.cpf){
        throw new Error('cpf is required.');
      }

      //essa consulta é muito mais complexa que isso, deve agauardar assistencia do DataBase-Mem
      sql = `select "CPF já Cadastrado" as status from USUARIO where CPF  = ? limit 1;`;
      const result = await Mysql.query(sql, [req.params.cpf]);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
  },

    verificaEmail: async (req, res) => {
    try {
      if (!req.params.cpf){
        throw new Error('email is required.');
      }

      //essa consulta é muito mais complexa que isso, deve agauardar assistencia do DataBase-Mem
      sql = `select "Email já Cadastrado" as status from USUARIO where EMAIL  = ? limit 1;`;
      const result = await Mysql.query(sql, [req.params.cpf]);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
  },

  getInfoCadastro : async (req, res) => {
    try {
      //essa consulta é muito mais complexa que isso, deve agauardar assistencia do DataBase-Mem
      sql = `SELECT * FROM USUARIO WHERE ID_USUARIO="${req.user.uid}"`;
      const result = await Mysql.query(sql, [req.query.idProfissional]);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Erro ao recuperar dados do usuário. \n" + error });
    }
  },


   cadastroUsuario: async (req, res) => {
    //try {
      var data = req.body.dataUser;
      data.ID_USUARIO = req.user.uid
      console.log(data);
      if (!data){
        throw new Error('dataUser is required.');
      }

      const clauseUpdate = Object.keys(data).map(key => `${key} = VALUES(${key})`).join(', ');
      const sql = `INSERT INTO USUARIO SET ? ON DUPLICATE KEY UPDATE ${data}`;
      const result = await Mysql.query(sql, data);
      res.status(200).json(result);
    //} catch (error) {
    //  res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    //}
  },


   atualizarHorarioUsuario: async (req, res) => {
    try {
      if (!req.body.dataUser){
        throw new Error('horarioUser is required.');
      }

      //essa consulta é muito mais complexa que isso, deve agauardar assistencia do DataBase-Mem
      sql = 'INSERT INTO CATEGORIA (`ID_CATEGORIA`, `NOME`) VALUES (7, "valorInserido") ON DUPLICATE KEY UPDATE `NOME` = "valorAtualizaod";';
      console.lgo(sql);
      //const users = await Mysql.query(sql, [req.query.idProfissional]);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
  },


   atualizarServicosUsuario: async (req, res) => {
    try {
      if (!req.body.horarioUser){
        throw new Error('servicosUser is required.');
      }

      sql = 'update';
      console.lgo(sql);
      //const users = await Mysql.query(sql, [req.query.idProfissional]);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
  },


   ativarUsuario: async (req, res) => {
    try {
      if (!req.body.dataUser){
        throw new Error('dataUser is required.');
      }

      //essa consulta é muito mais complexa que isso, deve agauardar assistencia do DataBase-Mem
      sql = 'update';
      console.lgo(sql);
      //const users = await Mysql.query(sql, [req.query.idProfissional]);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
  },

    login: async (req, res) => {
      return res.status(200).json({ message: 'Sucess' });
    }

  // Implemente as demais funções do CRUD aqui usando mysqlquery
};