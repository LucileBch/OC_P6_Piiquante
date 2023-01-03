//------------ LOGIQUE METIER USER ------------
// Importation de bcrypt, de jsonwebtoken et du modèle User
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Exportation de la fonction Signup
// Fonction asynchrone pour crypter le password du corps de la requête
// Récupération du password hashé
// Enregistrement du User dans la database
// Catch pour capter l'erreur serveur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

// Exportation de la fonction Login
// Vérification de l'identité du client
// Récupération et vérification de l'existance du User dans la database
// Vérification de la validité du password transmis par le client
    // Password incorrect : message d'erreur
    // Password correct : retour d'un objet avec l'ID et le token
// Erreur serveur
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };