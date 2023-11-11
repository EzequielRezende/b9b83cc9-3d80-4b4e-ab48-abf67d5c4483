const Mysql = require('../../../modulos/Mysql');

class AlbumController {
  // Método para fazer upload de uma imagem para um álbum
  async uploadFotoPerfil(req, res) {
    try {
      if (!req.file || !req.file.filename || res.fileValidation) {
        return res.status(400).json({ message: 'Arquivo inválido. Apenas arquivos de imagem são permitidos.' });
      }

      // A imagem enviada está disponível em req.file
      const uploadedImage = req.file.filename;
      const sql = `UPDATE USUARIO SET FOTO_PERFIL='${req.file.filename}' WHERE ID_USUARIO='${req.params.idUsuario}'`
      Mysql.query(sql);

      // Envie uma resposta de sucesso
      res.status(200).json({ message: 'Imagem enviada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao processar o upload da imagem.' });
    }
  }



  async uploadImgsAlbum(req, res) {
    try {
      console.log(req.files);
      if (!req.files || !req.files.length>0 || res.fileValidation) {
        return res.status(400).json({ message: 'Arquivo inválido. Apenas arquivos de imagem são permitidos.' });
      }

      // A imagem enviada está disponível em req.file
      const uploadedImage = req.files;
      //////////////////////////////////////////////////////////////////////////
      /////////////////////UPLOAD COM SUCESSO///////////////////////////////////
      /////////////////////CONTINUA A PARTIR DAQUI//////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      //const sql = `UPDATE USUARIO SET FOTO_PERFIL='${req.file.filename}' WHERE ID_USUARIO='${req.params.idUsuario}'`
      //Mysql.query(sql);

      // Envie uma resposta de sucesso
      res.status(200).json({ message: 'sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'upload erro' });
    }
  }

  // Outros métodos relacionados a álbuns podem ser definidos aqui, como listar álbuns, criar álbuns, etc.
}

module.exports = new AlbumController();
