//------------ LOGIQUE METIER SAUCE ------------
// Importation du modèle Sauce
const Sauce = require('../models/Sauce');

// Importation package fs
const fs = require('fs');

// Exportation fonction création sauce
// Parser l'objet requête
// Suppression les champs id et userId du corps de la requête
// Création de la nouvelle sauce en extrayant le userId du middleware auth et en créan l'URL de l'image
// Enregistrement de la sauce dans la base de données avec renvoie d'une réponse au frontend
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  
    sauce.save()
    .then(() => { res.status(201).json({message: 'Sauce enregistrée !'})})
    .catch(error => { res.status(400).json( { error })})
 };

// Exportation fonction modification d'une sauce
// Extraction objet et analyse présence champ file
    // Si oui => parser
    // Si non => récupération de l'objet dans le corps de la requête
// Suppression du userId du corps de la requête
// Recupération de la sauce dans la base de donnée
    // Cas de succès et userId non valide => renvoie erreur
    // Cas de succès et userId valide => updateOne en comparant la sauce dans la DB avec celle de la requête + réponse OK ou erreur
    // Cas d'erreur
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Sauce modifiée!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

// Exportation fonction récupération toutes les sauces
 exports.getAllSauce = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  };

// Exportation fonction récupération une sauce spécifique
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  };

// Exportation fonction suppression d'une sauce
// Vérification des droits utilisateurs en récupérant de la sauce
    // Vérification de l'userId
    // Suppression de l'objet de la database et l'image du système de fichiers
// Gestion des cas d'erreurs
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Sauce supprimée !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };

 // Exportation fonction like/dislike d'une sauce
 