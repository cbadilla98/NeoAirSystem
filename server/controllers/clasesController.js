const ClaseModel = require("../models/Clases");


module.exports.get = async (req, res, next) => {
    const posts = await ClaseModel.find().exec();
    res.json(posts);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const post = await ClaseModel.findOne({ _id: id }).exec();
  res.json(post);
};

module.exports.create = (req, res, next) => {
  const { name, content } = req.body;
  const post = new ClaseModel({ ...req.body });
  post.save();
  res.json(post);
};

module.exports.delete = async (req, res, next) => {
  const post = await ClaseModel.findByIdAndRemove(req.params.id);
  // si post es null significa que no existe el registro
  if (post) {
    res.json({ result: `Clase borrada correctamente`, post });
  } else {
    res.json({ result: "Id de clase inválido", post });
  }
};

module.exports.update = async (req, res, next) => {
  const { nombre,activo } = req.body;
  const post = await ClaseModel.findOneAndUpdate(
    { _id: req.params.id },
    { nombre, activo }, // ==> {activo: activo, nombre: nombre}
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(post);
};