const multer = require('multer');
const path   = require('path');
const fs     = require('fs');
const { v4: uuidv4 } = require('uuid')

class Multer {
    constructor() {
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const destinationDir = this.configureUploadPath(req);
                cb(null, destinationDir);
            },

            filename: (req, file, cb) => {
                const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
                cb(null, fileName);
            }
        });
        this.upload = multer({storage:this.storage, fileFilter: this.imageFilter});
    }

    checkDirExists(directoryPath) {
        if (!fs.existsSync(directoryPath)) {
            return fs.mkdirSync(directoryPath, { recursive: true });
        } else{
            return true;
        }

    }

    configureUploadPath = (req) => {
        const uploadType = req.params.uploadType;

        const uploadPaths = {
            fotoPerfil: () => `uploads/usuarios/${req.params.idUsuario}/fotoPerfil/`,
            albums: () => `uploads/albums/${req.params.idAlbum}/`,
        };

        if (uploadPaths.hasOwnProperty(uploadType) && typeof uploadPaths[uploadType] === 'function') {
            const directoryPath = path.join(__dirname, '../../..', uploadPaths[uploadType]());
            this.checkDirExists(directoryPath);
            return directoryPath;
        } else {
            throw new Error('Tipo de upload não suportado');
        }
    }

    imageFilter(req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
          req.fileValidation = true;
          cb(null, true);
        } else {
          req.fileValidation = false;
          cb(null, false);
        }
    }

    generateFileName = (req, file, cb) => {
        const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
}

module.exports = new Multer();









/*

function configureUploadPath(req) {
    const uploadType = req.params.uploadType;
    // Defina um mapeamento para os tipos de upload e configura os diretórios correspondentes
    const uploadPaths = {
        fotoPerfil  : () => `uploads/usuarios/${req.params.idUsuario}/fotoPerfil/`,
        albums      : () => `uploads/albums/${req.params.idAlbum}/`,
    };

    if (uploadPaths[uploadType]()) {
        const directoryPath = path.join(__dirname, '../../..', uploadPaths[uploadType]());
        checkDirExists(directoryPath); // checa e/ou cria o diretorio
        return directoryPath;
    } else {
        throw new Error('Tipo de upload não suportado');
    }
}

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        req.fileValidation = true;
        cb(null, true);
    } else {
        req.fileValidation = false;
        cb(null, false);
    }
};

function checkDirExists(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationDir = configureUploadPath(req);
        cb(null, destinationDir);
    },

    filename: (req, file, cb) => {
        const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

const multerUpload = multer({ storage, fileFilter: imageFilter });

module.exports = multerUpload;
*/
