const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserController = require("../controllers/user.controller.js");

const userController = new UserController();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", passport.authenticate("jwt", { session: false }), userController.profile);
router.post("/logout", userController.logout.bind(userController));
router.get("/admin", passport.authenticate("jwt", { session: false }), userController.admin);
router.post("/requestPasswordReset", userController.requestPasswordReset); // Nueva ruta
router.post('/reset-password', userController.resetPassword);

//Cuarta integradora: 
//1) Mover la ruta suelta /api/users/premium/:uid a un router específico para usuarios en /api/users/
router.put("/premium/:uid", userController.cambiarRolPremium);

//2) Modificar el modelo de User.

//3)Crear un endpoint en el router de usuarios api/users/:uid/documents con el método POST que permita subir uno o múltiples archivos. Utilizar el middleware de Multer para poder recibir los documentos que se carguen y actualizar en el usuario su status para hacer saber que ya subió algún documento en particular.

const upload = require("../middleware/multer.js");
const UserRepository = require("../repositories/user.repository.js");
const userRepository = new UserRepository();

router.post('/:uid/documents', upload.fields([
    { name: 'document' }, { name: 'products' }, { name: 'profile' }]), async (req, res) => {
        const { uid } = req.params;
        const uploadedDocuments = req.files;

        try {
            const user = await userRepository.findById(uid);

            if (!user) {
                return res.status(404).send("Usuario no encontrado");
            }

            // Verificar si se subieron documentos y actualizar el usuario
            if (uploadedDocuments) {
                if (uploadedDocuments.document) {
                    user.documents = user.documents.concat(uploadedDocuments.document.map(doc => ({
                        name: doc.originalname,
                        reference: doc.path
                    })));
                }
                if (uploadedDocuments.products) {
                    user.documents = user.documents.concat(uploadedDocuments.products.map(doc => ({
                        name: doc.originalname,
                        reference: doc.path 
                    })));
                }
                if (uploadedDocuments.profile) {
                    user.documents = user.documents.concat(uploadedDocuments.profile.map(doc => ({
                        name: doc.originalname,
                        reference: doc.path 
                    })));
                }
            }

            // Guardar los cambios en la base de datos
            await user.save();

            res.status(200).send("Documentos subidos exitosamente");
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    });

module.exports = router;


