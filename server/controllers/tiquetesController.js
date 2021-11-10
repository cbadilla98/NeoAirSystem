const TiquetesModel = require("../models/Tiquetes");


module.exports.get = async (req, res, next) => {
    const posts = await TiquetesModel.find().populate("clases").populate("aviones").populate("tipoTiquete").exec();
    res.json(posts);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const post = await TiquetesModel.findOne({ _id: id }).populate("clases").populate("aviones").populate("tipoTiquete").exec();
  res.json(post);
};

module.exports.create = (req, res, next) => {
  const { name, content } = req.body;
  const post = new TiquetesModel({ ...req.body });
  post.save();
  res.json(post);
};

module.exports.delete = async (req, res, next) => {
  const post = await TiquetesModel.findByIdAndRemove(req.params.id);
  // si post es null significa que no existe el registro
  if (post) {
    res.json({ result: `Tiquete borrado correctamente`, post });
  } else {
    res.json({ result: "Id de tiquete inválido", post });
  }
};

module.exports.update = async (req, res, next) => {
  const { nombre,precio, destino, activo, fechaSalida, aviones, clase, tipoTiquete } = req.body;
  const post = await TiquetesModel.findOneAndUpdate(
    { _id: req.params.id },
    { nombre,precio, destino, activo, fechaSalida, aviones, clase, tipoTiquete  }, // ==> {activo: activo, nombre: nombre}
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(post);
};