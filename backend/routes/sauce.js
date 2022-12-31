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
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauce);


// Exportation du router
module.exports = router;
