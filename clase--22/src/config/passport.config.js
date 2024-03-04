//Vemos la estrategia de Passport con JWT:

//Importamos passport y jwt. 
const passport = require("passport");
const jwt = require("passport-jwt");
//Guarda! cuidado cuando importan. 


const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "coderhouse",
        //Misma palabra secreta queen la App.js
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }))
}

//Creamos el Cookie Extractor:

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["coderCookieToken"];
        //Si hay cookie, tomamos la que yo necesito. 
    }
    return token;
}


module.exports = initializePassport;