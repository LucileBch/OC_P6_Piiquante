//------------ LOGIQUE DE ROUTING ------------
// Importation d'express, du controleur sauce, de l'authentification et de multer
const express = require('express');
const auth = require('../middleware/auth');
const sauceCtrl = require('../controllers/sauce');
const multer = require('../middleware/multer-config');

// Création du router avec la méthode Router
const router = express.Router();

// Création des routes
router.post('/', auth, multer, sauceCtrl.createSauce);
// router.put('/:id', sauceCtrl.modifySauce);
// router.delete('/:id', sauceCtrl.deleteSauce);
// router.get('/:id', sauceCtrl.getOnSauce);
// router.get('/', sauceCtrl.getAllSauce);


// Exportation du router
module.exports = router;
