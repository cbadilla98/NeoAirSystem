const TipoAvionesModel = require("../models/TipoAviones");


module.exports.get = async (req, res, next) => {
    const posts = await TipoAvionesModel.find().exec();
    res.json(posts);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const post = await TipoAvionesModel.findOne({ _id: id }).exec();
  res.json(post);
};

module.exports.create = (req, res, next) => {
  const { name, content } = req.body;
  const post = new TipoAvionesModel({ ...req.body });
  post.save();
  res.json(post);
};

module.exports.delete = async (req, res, next) => {
  const post = await TipoAvionesModel.findByIdAndRemove(req.params.id);
  // si post es null significa que no existe el registro
  if (post) {
    res.json({ result: `Tipo de avión borrado correctamente`, post });
  } else {
    res.json({ result: "Id de tipo de avión inválido", post });
  }
};

module.exports.update = async (req, res, next) => {
  const { marca, modelo, annio,activo } = req.body;
  const post = await TipoAvionesModel.findOneAndUpdate(
    { _id: req.params.id },
    { marca,modelo,annio, activo }, // ==> {activo: activo, nombre: nombre}
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(post);
};