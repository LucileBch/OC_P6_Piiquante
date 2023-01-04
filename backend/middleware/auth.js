//------------ VERIFICATION DES INFORMATIONS D'AUTHENTIFICATION ------------
// Importation de jsonwebtoken
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

// Exportation de la fonction
// Récupération du token en enlevant la première partie bearer
// Décodage du token avec la méthode verify en lui passant le token et la clé secrète
// Récupération du userId qui est ajouté à l'objet request qui est transmis aux routes appelées par la suite
// Gestion des erreurs avec catch
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};