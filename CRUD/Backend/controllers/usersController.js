const User = require('./Backend/models/User');

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Verificar si el usuario con el ID dado existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar la información del usuario
    user.name = name;
    user.email = email;
    user.password = password;

    // Guardar el usuario actualizado
    await user.save();

    // Responder con un mensaje de éxito y los detalles del usuario actualizado
    res.status(200).json({ message: 'Usuario actualizado exitosamente', user });
  } catch (error) {
    // Manejar errores y responder con un mensaje de error interno del servidor
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { updateUser };
