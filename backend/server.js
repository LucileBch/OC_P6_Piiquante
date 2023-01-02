// ------------ SERVEUR NODE ------------
// Importation du package http node et de l'application
const http = require('http');
const app = require('./app');

// Fonction normalizePort renvoyant un port valide sous forme de chaîne ou numéro
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');

// Indication du port surlequel l'application va tourner
app.set('port', port);

// Fonction qui cherche et gère les différents types d'erreurs
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Création du serveur en lui passant l'application comme argument
const server = http.createServer(app);

// Ecouteur d'évènement en lui consignant le port qui est écouté
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);