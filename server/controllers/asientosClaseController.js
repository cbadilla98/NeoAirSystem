const AsientosClaseModel = require("../models/AsientosClase");


module.exports.get = async (req, res, next) => {
    const posts = await AsientosClaseModel.find().populate("Clase").populate("TipoAviones").exec();
    res.json(posts);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const post = await AsientosClaseModel.findOne({ _id: id }).populate("Clase").populate("TipoAviones").exec();
  res.json(post);
};

module.exports.create = (req, res, next) => {
  const { name, content } = req.body;
  const post = new AsientosClaseModel({ ...req.body });
  post.save();
  res.json(post);
};

module.exports.delete = async (req, res, next) => {
  const post = await AsientosClaseModel.findByIdAndRemove(req.params.id);
  // si post es null significa que no existe el registro
  if (post) {
    res.json({ result: `Asientos borrado correctamente`, post });
  } else {
    res.json({ result: "Id de Asientos inválido", post });
  }
};

module.exports.update = async (req, res, next) => {
  const { cantidadPasajeros,cantidadFilas, cantidadAsientosPorFila, clase, tipoAviones } = req.body;
  const post = await AsientosClaseModel.findOneAndUpdate(
    { _id: req.params.id },
    { cantidadPasajeros,cantidadFilas, cantidadAsientosPorFila, clase, tipoAviones }, // ==> {activo: activo, nombre: nombre}
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(post);
};