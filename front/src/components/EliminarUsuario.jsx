import React, { useState } from 'react';
import { deleteUser } from './ApiMethods';
import { Button, Form } from 'react-bootstrap';


function EliminarUsuario() {
  const [user, setUser] = useState({
    id: '',
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
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  //e.preventDefault() = evito que se recargue la página
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const _deleteUser = await deleteUser(user.id);
      console.log('Usuario Eliminado:', user.id);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formID">
        <Form.Label>ID Usuario:</Form.Label>
        <Form.Control
          type="number"
          name="id"
          value={user.id}
          onChange={handleInputChange}
        />
      </Form.Group>
      
      <div className="input-container">
              <Button variant="primary" type="submit" className='btn btn-secondary'>
                Eliminar Usuario
              </Button>
      </div>
    </Form>
  );
}

export default EliminarUsuario;
