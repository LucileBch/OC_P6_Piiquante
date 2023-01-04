// ------------ APPLICATION ------------
// Importation d'express et de mongoose
const express = require('express');
const mongoose = require('mongoose');

// Securité
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');


// Importation des router user, sauce et path
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const path = require('path');

// Connexion de l'API à la base de données 
mongoose.connect(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_MDP}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
   { useNewUrlParser: true,
     useUnifiedTopology: true })
   .then(() => console.log('Connexion à MongoDB réussie !'))
   .catch(() => console.log('Connexion à MongoDB échouée !'));

// Création et lancement de l'application express
const app = express();
app.use(express.json());

// Middleware permettant les requêtes cross-origins
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Enregistrement des routes pour les users, les sauces et les images
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// Securité
app.use(morgan('dev'));
app.use(helmet());
app.use(mongoSanitize());


// Limite de requêtes à 100 toutes les 15 minutes
const limiter = rateLimit ({
	windowMs: 15 * 60 * 1000,
	max: 100,
});
app.use(limiter);

// Exportation de l'application pour l'exploiter à partir d'autres fichiers
module.exports = app;