const TipoUsuarioModel = require("../models/TipoUsuario");


module.exports.get = async (req, res, next) => {
    const posts = await TipoUsuarioModel.find().exec();
    res.json(posts);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const post = await TipoUsuarioModel.findOne({ _id: id }).exec();
  res.json(post);
};

module.exports.create = (req, res, next) => {
  const { name, content } = req.body;
  const post = new TipoUsuarioModel({ ...req.body });
  post.save();
  res.json(post);
};

module.exports.delete = async (req, res, next) => {
  const post = await TipoUsuarioModel.findByIdAndRemove(req.params.id);
  // si post es null significa que no existe el registro
  if (post) {
    res.json({ result: `Tipo de usuario borrado correctamente`, post });
  } else {
    res.json({ result: "Id de tipo de usuario inválido", post });
  }
};

module.exports.update = async (req, res, next) => {
  const { nombre, activo } = req.body;
  const post = await TipoUsuarioModel.findOneAndUpdate(
    { _id: req.params.id },
    { nombre, activo }, // ==> {activo: activo, nombre: nombre}
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(post);
};