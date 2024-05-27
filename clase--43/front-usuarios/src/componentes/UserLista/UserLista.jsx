import React from 'react';
import UserItem from '../UserItem/UserItem.jsx';

const UserLista = ({ usuario, editar, borrar }) => (
  <div>
    {usuario.map(user => (
      <UserItem key={user._id} usuario={user} editar={editar} borrar={borrar} />
    ))}
  </div>
);

export default UserLista;
