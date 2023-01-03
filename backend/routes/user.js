//------------ LOGIQUE ROUTING USER ------------
// Importation d'express, du controleur user et du middleware password
const express = require('express');
const userCtrl = require('../controllers/user');
const password = require('../middleware/password');

// Création du router avec la méthode Router
const router = express.Router();

// Création des routes
router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation du router
module.exports = router;