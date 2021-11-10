const AvionesModel = require("../models/Aviones");


module.exports.get = async (req, res, next) => {
    const posts = await AvionesModel.find().populate("tipoAviones").exec();
    res.json(posts);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const post = await AvionesModel.findOne({ _id: id }).populate("tipoAviones").exec();
  res.json(post);
};

module.exports.create = (req, res, next) => {
  const { name, content } = req.body;
  const post = new AvionesModel({ ...req.body });
  post.save();
  res.json(post);
};

module.exports.delete = async (req, res, next) => {
  const post = await AvionesModel.findByIdAndRemove(req.params.id);
  // si post es null significa que no existe el registro
  if (post) {
    res.json({ result: `Avión borrado correctamente`, post });
  } else {
    res.json({ result: "Id de Avión inválido", post });
  }
};

module.exports.update = async (req, res, next) => {
  const { tipoAviones,activo } = req.body;
  const post = await AvionesModel.findOneAndUpdate(
    { _id: req.params.id },
    { tipoAviones, activo }, // ==> {activo: activo, nombre: nombre}
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(post);
};