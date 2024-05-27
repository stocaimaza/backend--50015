import React, { useState, useEffect } from 'react';

const UserForm = ({ usuario, guardar }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (usuario) {
            setFormData(usuario);
        }
    }, [usuario]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        guardar(formData);
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="first_name"
                placeholder="Nombre"
                value={formData.first_name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="last_name"
                placeholder="Apellido"
                value={formData.last_name}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
            />
            <button type="submit"> Guardar </button>
        </form>
    );
};

export default UserForm;