// ------------ MIDDLEWARE EXIGENCE PASSWORD ------------
// Importation de password-validator
const passwordValidator = require('password-validator');

// Création du schéma
const passwordSchema = new passwordValidator();

// Le schéma à respecter par le password
passwordSchema
.is().min(5)                                    // Minimum length 5
.is().max(15)                                   // Maximum length 15
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)) {
        next();
    } else {
        return res.status(400).json({ error: 'Le mot de passe est trop faible' })
    }
};