import React, { useState } from 'react';
import { createUser } from './ApiMethods';
import { Button, Form } from 'react-bootstrap';


function CrearUsuario() {
  const [user, setUser] = useState({
    name: '',
    age: '',
    email: '',
    is_premium: false,
    birthdate: '',
  });

  //la función handleInputChange  me va guardando los valores de cada input cuando se modifican
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === 'checkbox' ? checked : type === 'date' ? new Date(value).toISOString().split('T')[0] : value,
    }));
  };

  //e.preventDefault() = evito que se recargue la página
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const createdUser = await createUser(user);
      console.log('Usuario creado:', createdUser);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Nombre:</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={user.name}
          onChange={handleInputChange}
        />
      </Form.Group>
      
      
      <Form.Group className="mb-3" controlId="formEdad">
        <Form.Label>Edad:</Form.Label>
        <Form.Control
          type="number"
          name="age"
          value={user.age}
          onChange={handleInputChange}
          placeholder="Ingrese su edad"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          placeholder="Ingrese su Email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPremium">
        <Form.Check
          type="checkbox"
          label="Premium"
          name="is_premium"
          checked={user.is_premium}
          onChange={handleInputChange}
          inline
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBirthdate">
        <Form.Label>Fecha de Nacimiento:</Form.Label>
        <Form.Control
          type="date"
          name="birthdate"
          value={user.birthdate}
          onChange={handleInputChange}
        />
      </Form.Group>
      
      {/*<button className="btn btn-primary" type="submit">Crear Usuario</button>*/}
      <div className="input-container">
              <Button variant="primary" type="submit" className='btn btn-secondary'>
                Crear Usuario
              </Button>
      </div>
    </Form>
  );
}

export default CrearUsuario;
