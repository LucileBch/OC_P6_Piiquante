// Importation d'express
const express = require('express');

// Création d'une application express
const app = express();

//Middleware test
app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    next();
  });
  
  app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
  });

// Exportation de l'application pour l'exploiter à partir d'autres fichiers
module.exports = app;
