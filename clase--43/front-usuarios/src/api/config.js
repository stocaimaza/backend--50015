import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/users', // URL base de la API
});

export const getUsers = () => api.get('/');
export const getUser = (id) => api.get(`/${id}`);
export const createUser = (user) => api.post('/', user);
export const updateUser = (id, user) => api.patch(`/${id}`, user);
export const deleteUser = (id) => api.delete(`/${id}`);

export default api;
