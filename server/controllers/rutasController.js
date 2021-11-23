const RutasModel = require("../models/Rutas");


module.exports.get = async (req, res, next) => {
    const posts = await RutasModel.find().populate("aviones").exec();
    res.json(posts);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const post = await RutasModel.findOne({ _id: id }).populate("aviones").exec();
  res.json(post);
};

module.exports.create = (req, res, next) => {
  const { name, content } = req.body;
  const post = new RutasModel({ ...req.body });
  post.save();
  res.json(post);
};

module.exports.delete = async (req, res, next) => {
  const post = await RutasModel.findByIdAndRemove(req.params.id);
  // si post es null significa que no existe el registro
  if (post) {
    res.json({ result: `Ruta borrada correctamente`, post });
  } else {
    res.json({ result: "Id de ruta inválido", post });
  }
};

module.exports.update = async (req, res, next) => {
  const { salida,destino, duracion, activo, aviones } = req.body;
  const post = await RutasModel.findOneAndUpdate(
    { _id: req.params.id },
    { salida,destino, duracion, activo, aviones }, // ==> {activo: activo, nombre: nombre}
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(post);
};