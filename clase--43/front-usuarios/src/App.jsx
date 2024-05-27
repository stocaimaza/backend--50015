import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from './api/config.js';
import UserForm from './componentes/UserForm/UserForm.jsx';
import UserLista from './componentes/UserLista/UserLista.jsx';
import "./App.css";

const App = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditado, setUsuarioEditado] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await getUsers();
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al pedir los usuarios, vamos a morir', error);
    }
  };

  const handleGuardarUsuarios = async (usuario) => {
    try {
      if (usuarioEditado) {
        await updateUser(usuarioEditado._id, usuario);
      } else {
        await createUser(usuario);
      }
      fetchUsuarios();
      setUsuarioEditado(null);
    } catch (error) {
      console.error('Error al guardar el usuario', error);
    }
  };

  const handleEditarUsuarios = (usuario) => {
    setUsuarioEditado(usuario);
  };

  const handleBorrarUsuario = async (id) => {
    try {
      await deleteUser(id);
      fetchUsuarios();
    } catch (error) {
      console.error('Error al borrar un usuario', error);
    }
  };

  return (
    <div className="container">
      <h1>ABM Usuarios</h1>
      <UserForm usuario={usuarioEditado} guardar={handleGuardarUsuarios} />
      <UserLista usuario={usuarios} editar={handleEditarUsuarios} borrar={handleBorrarUsuario} />
    </div>
  );
};

export default App;
