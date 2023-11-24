import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/UserTable">Usuarios</Link>
        </li>
        <li>
          <Link to="/LoginV2">Iniciar Sesión</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
