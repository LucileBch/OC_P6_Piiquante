//------------ MODELE DE DONNEES SAUCE ------------
// Importation de mongoose
const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

// Définition du schéma de données
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  mainPepper: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true, min: 1, max: 10 },
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: [String], required: false, default: [] },
  usersDisliked: { type: [String], required: false, default: [] },
});

sauceSchema.plugin(mongodbErrorHandler);

// Exportation de sauceSchéma avec la méthode model
module.exports = mongoose.model('Sauce', sauceSchema);