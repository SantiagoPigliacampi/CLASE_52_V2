import React, { useEffect, useState } from 'react';
import { updateUser } from './ApiMethods';
import { Button, Form } from 'react-bootstrap';



function ModificarUsuario(props) {
  

  const [user, setUser] = useState({
    id_user: props.usuarioModificar.id_user ?? '',
    name: props.usuarioModificar.name ?? '',
    age: props.usuarioModificar.age ?? '',
    email: props.usuarioModificar.email ?? '',
    is_premium: props.usuarioModificar.is_premium ?? '',
    birthdate: props.usuarioModificar.birthdate ? props.usuarioModificar.birthdate.substring(0,10) :'',
  });

  //la función handleInputChange  me va guardando los valores de cada input cuando se modifican
   //función toISOString de JavaScript, que devuelve una cadena en formato "yyyy-MM-ddTHH:mm:ss.sssZ".
  // y el split excluye la hora, dejando sólo la fecha
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
        /* console.log('Usuario Edad:', user.age); */
      const _updateUser = await updateUser(user.id_user, user);
      console.log('Usuario Modificado:', _updateUser);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  useEffect(() => {
    
    console.log('props', props);
  }, [props]);

  return (
    <Form onSubmit={handleSubmit}>
       {/*  <Form.Group className="mb-3" controlId="formID">
        <Form.Label>ID Usuario:</Form.Label>
        <Form.Control
          type="number"
          name="id"
          value={user.id}
          onChange={handleInputChange}
          placeholder="Ingrese ID Usuario ha modificar"
        />
      </Form.Group> */}

      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Nombre:</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={user.name}
          onChange={handleInputChange}
          placeholder="Ingrese su Nombre"
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

      <div className="input-container">
              <Button variant="primary" type="submit" className='btn btn-secondary'>
                Modificar Usuario
              </Button>
      </div>
    </Form>
  );
}

export default ModificarUsuario;
