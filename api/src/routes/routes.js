// ./root/api/src/routes/routes.js
const routes = require('express').Router();
//const {Validate, googleLogin, facebookLogin, emailLogin}
const Auth = require("../../../middlewares/authentication.js");

// Importe os controladores aqui
const UserControllers = require('../controllers/userControllers');
const AlbumControllers = require('../controllers/albumControllers');

const multer  = require('../utils/multerConfig'); // uploader de arquivos
//const multerUpload  = require('../utils/multerConfig'); // uploader de arquivos


// Defina as rotas da API
//router.post('/version'			, Auth.email);
routes.get('/getTime'				, UserControllers.getTime); //Authentication.validate, rota protegida 
routes.get('/getTimeLogin'			, Auth.validate ,UserControllers.getTime);  
routes.get('/getAllProfissionais' 	, UserControllers.getAllProfissionais);  
routes.get('/searchProfissionais' 	, UserControllers.searchProfissionais);  
routes.get('/profissional/:id' 		, UserControllers.getProfissionalById);  


routes.post('/cadastroUsuario'		, UserControllers.cadastroUsuario);

/*
routes.post('/profissional/:id/uploadFotoPerfil', Auth.validate ,  multerUpload .single('image'), UserControllers.uploadFotoPerfil);
routes.post('/profissional/:id/upload/:idAlbum', Auth.validate  ,  multerUpload .array('image', 15), AlbumControllers.uploadImagem);
*/

routes.post('/imagemUpload/:idUsuario/:uploadType'           ,  multer.upload.single('image')      , AlbumControllers.uploadFotoPerfil);
routes.post('/imagemUpload/:idUsuario/:uploadType/:idAlbum/' ,  multer.upload.array('image', 12)   , AlbumControllers.uploadImgsAlbum);


/*
routes.post('/users', UserControllers.createUser);
routes.get('/users/:id', UserControllers.getUserById);
routes.put('/users/:id', UserControllers.updateUser);
routes.delete('/users/:id', UserControllers.deleteUser);
*/
module.exports = routes;