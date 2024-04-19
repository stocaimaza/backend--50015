/** PRACTICA CON POSGRE SQL **/

const express = require("express");
const app = express();
const PUERTO = 8080;
const { Pool } = require("pg");

//pg es un módulo de Node.js que sirve como cliente para interactuar con bases de datos PostgreSQL. Este módulo proporciona una interfaz de programación para Node.js que te permite conectarte a una base de datos PostgreSQL, enviar consultas SQL, y manipular datos de manera eficiente.

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Configuración inicial: 
// Este objeto pool se utiliza para administrar un grupo de conexiones a la base de datos PostgreSQL.
// Configuración de la conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'colegio',
    password: 'coderhouse',
    port: 5432, // El puerto predeterminado de PostgreSQL es 5432
});

//CREAR ALUMNO: 
app.post('/alumnos', async (req, res) => {
    const { nombre, apellido, fecha_nacimiento, direccion, telefono } = req.body;

    try {
        const result = await pool.query('INSERT INTO alumnos (nombre, apellido, fecha_nacimiento, direccion, telefono) VALUES ($1, $2, $3, $4, $5) RETURNING *', [nombre, apellido, fecha_nacimiento, direccion, telefono]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error al crear alumno:', err);
        res.status(500).send('Error del servidor');
    }
});


//OBTENER TODOS LOS ALUMNOS

app.get('/alumnos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM alumnos');
        res.json(result.rows);
    } catch (err) {
        console.error('Error al obtener alumnos:', err);
        res.status(500).send('Error del servidor');
    }
});

//OBTENER ALUMNO POR ID: 

app.get('/alumnos/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query('SELECT * FROM alumnos WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error al obtener alumno:', err);
        res.status(500).send('Error del servidor');
    }
});


//ACTUALIZAR ALUMNO POR ID: 
app.put('/alumnos/:id', async (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, fecha_nacimiento, direccion, telefono } = req.body;

    try {
        const result = await pool.query('UPDATE alumnos SET nombre = $1, apellido = $2, fecha_nacimiento = $3, direccion = $4, telefono = $5 WHERE id = $6 RETURNING *', [nombre, apellido, fecha_nacimiento, direccion, telefono, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }

        res.json({ message: 'Alumno actualizado correctamente', updatedAlumno: result.rows[0] });
    } catch (err) {
        console.error('Error al actualizar alumno:', err);
        res.status(500).send('Error del servidor');
    }
});


//ELIMINAR ALUMNO POR ID: 
app.delete('/alumnos/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query('DELETE FROM alumnos WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }

        res.json({ message: 'Alumno eliminado correctamente', deletedAlumno: result.rows[0] });
    } catch (err) {
        console.error('Error al eliminar alumno:', err);
        res.status(500).send('Error del servidor');
    }
});



app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});