//------------ LOGIQUE ROUTING USER ------------
// Importation d'express et du controleur user
const express = require('express');
const userCtrl = require('../controllers/user');

// Création du router avec la méthode Router
const router = express.Router();

// Création des routes 
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation du router
module.exports = router;