const jwt = require("jsonwebtoken");
const userModel = require("../models/Usuario");
//Se obtiene las variables de entorno
const config = process.env;

//Se verifica que el token sea valido
const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Se requiere un token");
  }
  try {
    const { username } = jwt.verify(token, config.SECRETWORDJWT);
    req.user = await userModel.findOne({ username }).exec();
  } catch (err) {
    return res.status(401).send("Token inválido");
  }
  return next();
};

module.exports = verifyToken;