const TipoTiqueteModel = require("../models/TipoTiquete");


module.exports.get = async (req, res, next) => {
    const posts = await TipoTiqueteModel.find().exec();
    res.json(posts);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const post = await TipoTiqueteModel.findOne({ _id: id }).exec();
  res.json(post);
};

module.exports.create = (req, res, next) => {
  const { name, content } = req.body;
  const post = new TipoTiqueteModel({ ...req.body });
  post.save();
  res.json(post);
};

module.exports.delete = async (req, res, next) => {
  const post = await TipoTiqueteModel.findByIdAndRemove(req.params.id);
  // si post es null significa que no existe el registro
  if (post) {
    res.json({ result: `Tipo de tiquete borrado correctamente`, post });
  } else {
    res.json({ result: "Id de tipo de tiquete inválido", post });
  }
};

module.exports.update = async (req, res, next) => {
  const { nombre, activo } = req.body;
  const post = await TipoTiqueteModel.findOneAndUpdate(
    { _id: req.params.id },
    { nombre, activo }, // ==> {activo: activo, nombre: nombre}
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(post);
};