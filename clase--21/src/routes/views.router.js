const express = require("express");
const router = express.Router();

// Ruta para el formulario de login
router.get("/login", (req, res) => {
    // Verifica si el usuario ya está logueado y redirige a la página de perfil si es así
    // if (req.session.login) {
    //     return res.redirect("/profile");
    // }

    res.render("login");
});

// Ruta para el formulario de registro
router.get("/register", (req, res) => {
    // Verifica si el usuario ya está logueado y redirige a la página de perfil si es así
    // if (req.session.login) {
    //     return res.redirect("/profile");
    // }
    res.render("register");
});

// Ruta para la vista de perfil
router.get("/profile", (req, res) => {
    // Verifica si el usuario está logueado
    // if (!req.session.login) {
    //     // Redirige al formulario de login si no está logueado
    //     return res.redirect("/login");
    // }

    // Renderiza la vista de perfil con los datos del usuario
    //res.render("profile", { user: req.session.user });
    res.render("profile");
});

module.exports = router;