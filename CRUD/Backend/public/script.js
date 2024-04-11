const form = document.querySelector('form');
const userList = document.querySelector('ul');

// Función para crear un nuevo usuario
async function createUser(formData) {
  try {
    const response = await fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    alert(data.message); // Muestra un mensaje de éxito o error
    if (response.ok) {
      fetchUsers(); // Vuelve a cargar la lista de usuarios
    }
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
}

// Función para obtener todos los usuarios
async function fetchUsers() {
  try {
    const response = await fetch('/users');
    const users = await response.json();
    renderUsers(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
}

// Función para actualizar un usuario
async function updateUser(userId, userData) {
  try {
    const response = await fetch(`/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    alert(data.message); // Muestra un mensaje de éxito o error
    if (response.ok) {
      fetchUsers(); // Vuelve a cargar la lista de usuarios
    }
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
  }
}

// Función para eliminar un usuario
async function deleteUser(userId) {
  try {
    const response = await fetch(`/users/${userId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    alert(data.message); // Muestra un mensaje de éxito o error
    if (response.ok) {
      fetchUsers(); // Vuelve a cargar la lista de usuarios
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
  }
}

// Función para renderizar la lista de usuarios
function renderUsers(users) {
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.name} - ${user.email}`;
    
    // Contenedor para los botones
    const buttonContainer = document.createElement('div');
    
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', () => {
      const newName = prompt('Introduce el nuevo nombre:');
      const newEmail = prompt('Introduce el nuevo email:');
      if (newName && newEmail) {
        const updatedUser = { name: newName, email: newEmail };
        updateUser(user._id, updatedUser);
      }
    });
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        deleteUser(user._id);
      }
    });

    // Agregar botones al contenedor
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);
    
    // Agregar contenedor de botones al elemento de la lista
    li.appendChild(buttonContainer);
    
    // Agregar elemento de la lista al contenedor principal
    userList.appendChild(li);
  });
}

// Manejar el envío del formulario
form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const userData = {};
  formData.forEach((value, key) => {
    userData[key] = value;
  });
  createUser(userData);
});

// Obtener y mostrar la lista de usuarios al cargar la página
fetchUsers();
