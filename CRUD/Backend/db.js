// db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Conectar a la base de datos MongoDB
    await mongoose.connect('mongodb://localhost:27017/crud_app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Conexión exitosa a la base de datos MongoDB');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1); // Salir del proceso con un código de error
  }
};

module.exports = connectDB;
