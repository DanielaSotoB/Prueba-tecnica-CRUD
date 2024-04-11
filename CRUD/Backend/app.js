const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const app = express();
const PORT = 3000;

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/my_database', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch(error => {
    console.error('Error al conectar a la base de datos:', error);
  });

// Middleware
app.use(bodyParser.json());

const path = require('path');

// Servir archivos estáticos desde la carpeta 'public' dentro de 'backend'
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/users', userRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
