import React, { useState } from 'react';
import { createUser } from './ApiMethods';



function CrearUsuario() {
  const [user, setUser] = useState({
    name: '',
    age: '',
    email: '',
    is_premium: false,
    birthdate: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lógica para enviar los datos del usuario al servidor
    try {
      const createdUser = await createUser(user);
      console.log('Usuario creado:', createdUser);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div>
        <label>
          Edad:
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div>
        <label>
          Premium:
          <input
            type="checkbox"
            name="is_premium"
            checked={user.is_premium}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div>
        <label>
          Fecha de Nacimiento:
          <input
            type="date"
            name="birthdate"
            value={user.birthdate}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <button className="btn btn-primary" type="submit">Crear Usuario</button>
    </form>
  );
}

export default CrearUsuario;
