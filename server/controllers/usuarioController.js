const UsuarioModel = require("../models/Usuario");
const TipoUsuarioModel = require("../models/TipoUsuario");
const mongoose= require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

//Se obtiene las variables de entorno
const config = process.env;

module.exports.get= async (req, res, next) => {
  const usuario = await UsuarioModel.find().populate("tipoUsuario").exec();
  res.json(usuario);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const usuario = await UsuarioModel.findById(id).populate("tipoUsuario").exec();
  res.json(usuario);
};

module.exports.create = (req, res, next) => {
  const usuario = new UsuarioModel({ ...req.body });
  usuario.save();
  res.json(usuario);
};
module.exports.signup = async (req, res, next) => {
    const {  usuario, contrasennia, nombre, apellidos, correo, fechaNacimiento, lt, ln, telefonoCelular, telefonoTrabajo, activo, tipoUsuario } = req.body;
    if (!usuario || !contrasennia) {
        res.json({ success: false, msg: 'Por favor envíe un usuario y una contraseña' });
    } else {
        
        //Encriptar la contraseña
        const salt = await bcrypt.genSalt();
        const  hashedPassword = await bcrypt.hash(req.body.contrasennia,salt);
        console.log(salt);
        console.log(hashedPassword);

        // save the user
        var newUser = new UsuarioModel({ usuario:req.body.usuario, contrasennia:hashedPassword, nombre:req.body.nombre, apellidos: req.body.apellidos, 
          correo:req.body.correo, fechaNacimiento: req.body.fechaNacimiento,lt:req.body.lt, ln: req.body.ln, telefonoCelular: req.body.telefonoCelular,
           telefonoTrabajo:req.body.telefonoTrabajo, tipoUsuario:req.body.tipoUsuario});
        newUser.save(function (err) {
            if (err) {
                return res.json({ success: false, msg: 'El usuario ya existe' });
            }
            res.json({ success: true, msg: 'Usuario creado correctamente' });
        });
    }
};

module.exports.delete = async (req, res, next) => {
  const usuario = await UsuarioModel.findByIdAndRemove(req.params.id);
  // si post es null significa que no existe el registro
  if (usuario) {
    res.json({ result: `Usuario borrado correctamente`, post: usuario });
  } else {
    res.json({ result: "Id de Usuario Inválido", post: usuario });
  }
};

module.exports.update = async (req, res, next) => {
  const { usuario, contrasennia, nombre, apellidos, correo, fechaNacimiento, lt, ln, telefonoCelular, telefonoTrabajo, activo, tipoUsuario } = req.body;
  const usuarioToChange = await UsuarioModel.findOneAndUpdate(
    { _id: req.params.id },
    { usuario, contrasennia, nombre, apellidos, correo, fechaNacimiento, lt, ln, telefonoCelular, telefonoTrabajo, activo, tipoUsuario }, // ==> {title: title, body: body}
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(usuarioToChange);
};

module.exports.updateTipoUsuario = async (req, res, next) => {
    const isValidId = mongoose.isValidObjectId(req.params.id);
    const { id, tipoUsuarioId } = req.params;
    if (isValidId) {
      const updated = await PostModel.findOneAndUpdate(
        { _id: id },
        { $push: { tipoUsuario: mongoose.Types.ObjectId(tipoUsuarioId) } },
        { new: true }
      ).populate("tipoUsuario").exec();
  
      res.json(updated);
    } else {
      res.json({ error: "Id incorrecto" });
    }
  };
  module.exports.signin = async (req, res, next) => {

    const { usuario, contrasennia } = req.body;

    const usuarioToValidate = await UsuarioModel.findOne({ usuario: usuario }).exec();

    if (!usuarioToValidate) {
        res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
        //Si el usuario existe verifica si las contraseñas
        usuarioToValidate.comparePassword(contrasennia, usuarioToValidate.contrasennia, function (err, isMatch) {
            if (isMatch && !err) {
              // Si el usuario es correcto y la contraseña coindice se procede a crear el token
              const token = jwt.sign(
                { usuario: usuario },
                config.SECRETWORDJWT,
                { expiresIn: "2h" }
              );
              // return the information including token as JSON
              const payload = { role: usuarioToValidate.tipoUsuario, usuario: usuarioToValidate.usuario };
              res.json({ success: true, token: token, usuario: payload });
            } else {
                //si la contraseña no coincide se procede a indicar el error
                //res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                res.json({ success: false, msg: 'Authentication failed. Wrong password.' });
            }
        });
    }
};
//   module.exports.deleteTipoUsuario = async (req, res, next) => {
//     const isValidId = mongoose.isValidObjectId(req.params.id);
//     const { id, commentId } = req.params;
//     if (isValidId) {
//       const updated = await PostModel.findOneAndUpdate(
//         { _id: id },
//         { $pull: { comments: mongoose.Types.ObjectId(commentId) } },
//         { new: true }
//       )
//         .populate("comments")
//         .exec();
//       await CommentModel.deleteOne({ _id: commentId }).exec();
//       res.json(updated);
//     } else {
//       res.json({ error: "Invalid ObjectId" });
//     }
//   };