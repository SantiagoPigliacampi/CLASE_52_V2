import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
//import ApiMethods from './ApiMethods';
//import CrearUsuario from "./CrearUsuario";
import CrearUsuario from "./CrearUsuariov2";
import ModificarUsuario from "./ModificarUsuario";
import EliminarUsuario from "./EliminarUsuario";
import { useNavigate } from 'react-router-dom';

function UserTable() {

  const [users, setUsers] = useState([]);

  const [mostrarTabla, setMostrarTabla] = useState(false);

  const [mostrarModificarUsuario, setMostrarModificarUsuario] = useState(false);

  const [mostrarEliminarUsuario, setMostrarEliminarUsuario] = useState(false);

  const [usuarioModificar, setUsuarioModificar] = useState([]); 



  const handleClick = () => {
    setMostrarTabla(true);
    setMostrarModificarUsuario(false);
    setMostrarEliminarUsuario(false);
  }  

  const handleModificarUsuarioClick = (e,user) => {
    setUsuarioModificar(user);
console.log("usuarioModificar",user.id_user);
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
      <div className="input-container d-flex gap-2">
              <Button variant="primary" type="button" onClick={handleClick}>
                Nuevo Usuario
              </Button>
              <Button variant="primary" type="button" onClick={handleAtrasClick}>
              Volver Atrás
            </Button>
        </div>     
        <div className="container">
        
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Edad</th>
                <th scope="col">Email</th>
                <th scope="col">Premium</th>
                <th scope="col">Fecha Nacimiento</th>
                <th scope="col">ModificarUsuario</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  {/* <td scope="row">{index+1}</td> */}
                  <td>{user.id_user}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
                  <td>{user.is_premium ? "Si" : "No"}</td>
                  <td>{user.birthdate ? user.birthdate.substring(0, 10) : ''}</td>
                  <td>
                   <Button variant="primary" type="button" onClick={(e) => handleModificarUsuarioClick(e,user)}>
                    Modificar
                  </Button> 
                  </td>
                  <td>
                  <Button variant="primary" type="button" onClick={handleEliminarUsuarioClick}>
                    Eliminar 
                  </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/*<button type="button" className="btn btn-primary" onClick={handleClick}>Nuevo Usuario</button>*/}
    
 
            {mostrarTabla && <CrearUsuario/>}
             {mostrarModificarUsuario && <ModificarUsuario usuarioModificar={usuarioModificar}/>} 
            {mostrarEliminarUsuario && <EliminarUsuario/>}            
          
        </div>        
      </section>      
    </>
  );
}
export default UserTable;
