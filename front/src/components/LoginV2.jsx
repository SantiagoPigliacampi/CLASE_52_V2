import React, { useState } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { listarUsuarios } from './ApiMethods';



const LoginV2 = ({ className }) => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [data,setData] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('input user', user);
        console.log('input user', password);

        try {
          const responseData = await listarUsuarios();
          const data = responseData[0];
          data.forEach(datum => {
          (datum.id_user == user && datum.name == password) && navigate('/Menu');          
          })
        } catch (error) {
          console.error('Error al crear el usuario:', error);
        }


        
    }

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', 
    };
    
    const formStyle = {
        width: '300px', 
    };

  return (
    <div className={`formularioLogin ${className}`} style={containerStyle}>
      <h2>Login</h2>
      <form >
        <label>
            Usuario: <input type='text' value={user} onChange={(e) => setUser(e.target.value)} ></input>
        </label>        
        <label>
            Contraseña: <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} ></input>
        </label>        
        <button type='button' className="buttonStyle" onClick={handleSubmit}>
            Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginV2;
