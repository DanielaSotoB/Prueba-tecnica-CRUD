const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    const newUser = new User({
      name,
      email,
      password // Agregar el campo password al nuevo usuario
    });

    // Guardar el usuario en la base de datos
    await newUser.save();


// Actualizar un usuario
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // Verificar si el usuario con el id dado existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar la información del usuario
    user.name = name;
    user.email = email;

    // Guardar el usuario actualizado en la base de datos
    await user.save();

    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


// Eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminar el usuario de la base de datos
    await User.findByIdAndDelete(id);

    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});



// Leer todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
