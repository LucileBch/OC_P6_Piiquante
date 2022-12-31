//------------ MIDDLEWARE GESTION FICHIERS ------------
// Importation de multer
const multer = require('multer');

// Dictionnaire des extensions pour la génération du filename
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Object de configuration pour multer avec un nom unique
// Utilisation de la propriété diskStorage
// Destination : lieu d'enregistrement des fichiers (images)
// Filename : déclaration/génération de l'appellation des fichiers
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Exportation du middleware multer
// Méthode multer : on lui passe l'objet storage
// Méthode single : indique qu'on lui passe un fichier unique et qu'il s'agit d'une image
module.exports = multer({storage: storage}).single('image');