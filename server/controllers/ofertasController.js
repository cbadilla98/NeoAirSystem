const OfertasModel = require("../models/Ofertas");


module.exports.get = async (req, res, next) => {
    const posts = await OfertasModel.find().populate("tiquetes").exec();
    res.json(posts);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const post = await OfertasModel.findOne({ _id: id }).populate("tiquetes").exec();
  res.json(post);
};

module.exports.create = (req, res, next) => {
  const { name, content } = req.body;
  const post = new OfertasModel({ ...req.body });
  post.save();
  res.json(post);
};

module.exports.delete = async (req, res, next) => {
  const post = await OfertasModel.findByIdAndRemove(req.params.id);
  // si post es null significa que no existe el registro
  if (post) {
    res.json({ result: `Oferta borrada correctamente`, post });
  } else {
    res.json({ result: "Id de oferta inválido", post });
  }
};

module.exports.update = async (req, res, next) => {
  const { descuento, fechaCreacion,fechaVencimiento,tiquetes,activo } = req.body;
  const post = await OfertasModel.findOneAndUpdate(
    { _id: req.params.id },
    { descuento, fechaCreacion,fechaVencimiento,tiquetes,activo  }, // ==> {activo: activo, nombre: nombre}
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(post);
};