import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
//import ApiMethods from './ApiMethods';
//import CrearUsuario from "./CrearUsuario";
import CrearUsuario from "./CrearUsuariov2";
import ModificarUsuario from "./ModificarUsuario";
import EliminarUsuario from "./EliminarUsuario";
import { useNavigate } from 'react-router-dom';

function UserTable() {

  const handleClick = () => {
    setMostrarTabla(true);
    setMostrarModificarUsuario(false);
    setMostrarEliminarUsuario(false);
  }  

  const handleModificarUsuarioClick = () => {
    setMostrarTabla(false);
    setMostrarModificarUsuario(true);
    setMostrarEliminarUsuario(false);
  }  

  const handleEliminarUsuarioClick = () => {
    setMostrarTabla(false);
    setMostrarModificarUsuario(false);
    setMostrarEliminarUsuario(true);
  }  

  const navigate = useNavigate();

  const handleAtrasClick = () => {
    navigate('/Menu');
  }

  const [users, setUsers] = useState([]);

  const [mostrarTabla, setMostrarTabla] = useState(false);

  const [mostrarModificarUsuario, setMostrarModificarUsuario] = useState(false);

  const [mostrarEliminarUsuario, setMostrarEliminarUsuario] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Users not found");
      }
      const data = await response.json();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error(error);
      return [];
    }


  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <section>     
        <div className="container">
        <Button variant="primary" type="button" onClick={handleAtrasClick}>
          Volver Atrás
        </Button>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Edad</th>
                <th scope="col">Email</th>
                <th scope="col">Premium</th>
                <th scope="col">Fecha Nacimiento</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td scope="row">{index+1}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
                  <td>{user.is_premium}</td>
                  <td>{user.birthdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/*<button type="button" className="btn btn-primary" onClick={handleClick}>Nuevo Usuario</button>*/}
          <div className="input-container d-flex gap-2">
              <Button variant="primary" type="button" onClick={handleClick}>
                Nuevo Usuario
              </Button>
              <Button variant="primary" type="button" onClick={handleModificarUsuarioClick}>
                Modificar Usuario
              </Button>
              <Button variant="primary" type="button" onClick={handleEliminarUsuarioClick}>
                Eliminar Usuario
              </Button>
          </div>      
 
            {mostrarTabla && <CrearUsuario/>}
            {mostrarModificarUsuario && <ModificarUsuario/>}
            {mostrarEliminarUsuario && <EliminarUsuario/>}            
          
        </div>        
      </section>      
    </>
  );
}
export default UserTable;
