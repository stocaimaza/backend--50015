// const express = require('express');
// const router = express.Router()

// const config = require('../src/config.json'); // Aca guardé mis credenciales privades. User, password, from y to.

// const nodemailer = require('nodemailer');
// const nodemailerHandlebars = require('nodemailer-express-handlebars');


// router.get('/plain', async (req, res) => {
//   try {
//     const sent = await transport.sendMail({
//       from: config.from,
//       to: config.to,
//       subject: 'Test email',
//       html: '<h1>This is a <strong>test</strong></h1>'
//     })
//     res.send({ message: 'Correo envíado', mailStatus: sent })
//   } catch (error) {
//     res.status(500).send(`Error at sending email. ${error}`)
//   }
// })

// router.get('/template', async (req, res) => {
//   try {
//     const emailData = { subjet: 'Vamo todavía!', body: 'Con esto me postulo para profe/contenidista de backend!!' };

//     const mailOptions = {
//       from: config.from,
//       to: config.to,
//       subject: emailData.subjet,
//       template: 'mail', // Acá declaramos la template a usar.
//       context: emailData, // Acá pasamos las varialbes que queremos enviar a nuestra template.
//     };
//     transport.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return res.status(500).send(error);
//       }
//       return res.send({ message: 'Correo envíado', mailStatus: info })
//     })
//   } catch (error) {
//     res.status(500).send(`(catch) Error at sending email. ${error}`)
//   }
// })

// module.exports = router;

// // Lo mismo que hizo el profe.
// const transport = nodemailer.createTransport({
//   service: 'gmail',
//   port: 587,
//   auth: {
//     user: config.user,
//     pass: config.pass
//   }
// })

// // Ruta y Extensión de mis templates de handlebars.
// transport.use('compile', nodemailerHandlebars({
//   viewEngine: {
//     extname: '.handlebars',
//     layoutsDir: './src/public/views/layout/',
//     defaultLayout: false,
//     partialsDir: './src/public/views/partials/'
//   },
//   viewPath: './src/public/views',
//   extname: '.handlebars',
// }));

