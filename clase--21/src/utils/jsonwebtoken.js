const jwt = require("jsonwebtoken");

const private_key = "palabrasecretaparatoken";

const generateToken = (user) => {
    const token = jwt.sign(user, private_key, {expiresIn: "24h"});
    //Le puedo poner una fecha de expiración. 
    return token; 
}

module.exports = generateToken;