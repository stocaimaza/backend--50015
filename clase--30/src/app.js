/** CLASE 30 - MAILING Y MENSAJERIA **/

//Temas de hoy: 

//1) Protocolo SMTP. 
//2) Nodemailer. 
//3) Usamos Express-Handlebars
//4) Twilio: sms y whatsapp. 

//SMTP: (Simple Mail Tranfer Protocol) o en espanish: Protocolo de transferencia de mail simple, es el protocolo que nuestras aplicaciones utilizan siempre que se tiene que enviar un correo electrónico. 

//Nodemailer: es una librería que nos permite realizar el envío de mensajeria desde nuestras aplicaciones. 
//Recueden que nodemailer trabaja como un puente entre nuestra aplicación y lo servicios de mail tradicional. 

//Levantamos un servidor muy simple para implementar nodemailer. 

const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const PUERTO = 8080; 

//Middleware 
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

//Express-Handlebars 
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/", (req, res) => {
    res.send("Bienvenidos!");
})

//Ruta para enviar un mail: 

// app.get("/mail",  async (req, res) => {
//     try {
//         await transport.sendMail({
//             from: "Coder Test <coderhouse50015@gmail.com>", 
//             to: "stocaimaza@hotmail.com",
//             subject: "Correo de prueba",
//             html: `<h1>Te secuestramos el Visual!!</h1>`
//         })
//         res.send("Correo enviado correctamente");
//     } catch (error) {
//         res.status(500).send("Error al enviar mail, vas a morir");
//     }
// })

//Usando una plantillita 


app.get("/mailplantilla", async (req, res) => {
    try {

        const emailData = {
            subject: "Correo de prueba",
            body: "Esto es un test!"
        }

        const html = await res.render("mail", emailData);

        await transport.sendMail({
            from: "Coder Test <coderhouse50015@gmail.com>", 
            to: "stocaimaza@hotmail.com",
            subject: emailData.subject,
            html
        })
       
        res.send("Mensaje enviado");
    } catch (error) {
        res.status(500).send("Error al enviar mail, vas a morir");
    }
})

//Enviamos archivos adjuntos / imgs

app.get("/mail", async (req, res) => {
    try {
        await transport.sendMail({
            from: "Coder Test <coderhouse50015@gmail.com>", 
            to: "stocaimaza@hotmail.com",
            subject: "Correo de prueba",
            html: `<h1>Con imagenes</h1>
                    <img src="cid:gatito1">`
                ,
            //Para enviar como adjunto: 
            attachments: [{
                filename: "gatito.webp",
                path:"./src/public/img/gatito.webp",
                cid: "gatito1"
            }]
        })
        res.send("Correo enviado con imagen");
    } catch (error) {
        res.status(500).send("Error al enviar mail, vas a morir");
    }
})

//Para mostrar la vista contacto: 
app.get("/contacto", (req, res) => {
    res.render("contacto");
})

app.post("/enviarmensaje", async (req, res) => {
    const {email, mensaje} = req.body;
    try {
        await transport.sendMail({
            from: "Coder Test <coderhouse50015@gmail.com>",
            to: email,
            subject: "TEST",
            text: mensaje
        })
        res.send("Correo enviado correctamente!");
    } catch (error) {
        res.status(500).send("Error al enviar mail, vas a morir");
    }
})

app.listen(PUERTO, () => {
    console.log("Escuchando el puerto 8080");
})

//Vamos a crear un objeto especial llamado "transporte". Acá voy a configurar el servicio SMTP  que vamos a utilizar. 

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587, 
    auth: {
        user: "coderhouse50015@gmail.com",
        pass: "norp renb afxw uxyq"
    }
})

//Twilio: servicio que nos permite enviar SMS, WhatsApp, chatbots, mensajes de voz pregrabados. 

const TWILIO_ACCOUNT_SID = "ACb5f8a2a6a8b381b7a019852f1e9136c7";
const TWILIO_AUTH_TOKEN = "37bb5f7d6cde654ef8f8f110d85f6cf9";
const TWILIO_SMS_NUMBER = "+12563968941";


//Configuramos el cliente: 
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SMS_NUMBER);

//Creamos la ruta para enviar un sms: 

app.get("/sms", async (req, res) => {
    await client.messages.create({
        body: "Esto es un SMS de prueba, no te asustes",
        from: TWILIO_SMS_NUMBER,
        to: "+542236693878"
    })
    res.send("Enviado el SMS!");
})


