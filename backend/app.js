// Importation d'express, de mongoose et dotenv
const express = require('express');
const mongoose = require('mongoose');

// Security
const dotenv = require('dotenv').config();

const userRoutes = require('./routes/user');


// Connexion de l'API à la base de données 
mongoose.connect(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_MDP}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
   { useNewUrlParser: true,
     useUnifiedTopology: true })
   .then(() => console.log('Connexion à MongoDB réussie !'))
   .catch(() => console.log('Connexion à MongoDB échouée !'));

// Lancement de l'application express
const app = express();
app.use(express.json());

// Middleware permettant les requêtes cross-origins
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use('/api/auth', userRoutes);

// Exportation de l'application pour l'exploiter à partir d'autres fichiers
module.exports = app;