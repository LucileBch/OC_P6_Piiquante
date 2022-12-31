//------------ MODELE USER ------------
// Importation de mongoose et de unique-validator
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Définition du schéma de données
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Plugin pour ne pouvoir utiliser une adresse email unique pour la création de compte
userSchema.plugin(uniqueValidator);

// Exportation de sauceSchéma avec la méthode .model
module.exports = mongoose.model('User', userSchema);