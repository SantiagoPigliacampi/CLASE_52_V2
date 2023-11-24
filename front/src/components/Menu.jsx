import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Menu = () => {
  const containerStyle = {
    textAlign: 'left',
  };

  const EstiloEncabezado = {
    marginBottom: '20px',
  };


  return (
    <div style={containerStyle}>
      <h1 style={EstiloEncabezado}>Clase 52 - Componente Con Enrutamiento</h1>
      <nav>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>
            <button className="EstiloBoton">
              <Link to="/*" style={{ textDecoration: 'none', color: 'black' }}>
                Inicio
              </Link>
            </button>
          </li>
          <li>
            <button className="EstiloBoton">
              <Link to="/UserTable" style={{ textDecoration: 'none', color: 'black' }}>
                ABM Usuarios
              </Link>
            </button>
          </li>
          <li>
            <button className="EstiloBoton">
              <Link to="/LoginV2" style={{ textDecoration: 'none', color: 'black' }}>
                Iniciar Sesión
              </Link>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
