import React from 'react';

const UserItem = ({ usuario, editar, borrar }) => (
  <div className="user-item">
    <h3>{usuario.first_name} {usuario.last_name}</h3>
    <p>{usuario.email}</p>
    <button className="edit" onClick={() => editar(usuario)}> Editar </button>
    <button onClick={() => borrar(usuario._id)}> Borrar </button>
  </div>
);

export default UserItem;
