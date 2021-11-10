const FacturaModel = require("../models/Factura");


module.exports.get = async (req, res, next) => {
    const posts = await FacturaModel.find().populate("Tiquetes").populate("Usuario").exec();
    res.json(posts);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const post = await FacturaModel.findOne({ _id: id }).populate("Tiquetes").populate("Usuario").exec();
  res.json(post);
};

module.exports.create = (req, res, next) => {
  const { name, content } = req.body;
  const post = new FacturaModel({ ...req.body });
  post.save();
  res.json(post);
};

module.exports.delete = async (req, res, next) => {
  const post = await FacturaModel.findByIdAndRemove(req.params.id);
  // si post es null significa que no existe el registro
  if (post) {
    res.json({ result: `Factura borrada correctamente`, post });
  } else {
    res.json({ result: "Id de factura inválido", post });
  }
};

module.exports.update = async (req, res, next) => {
  const { cantidad,fechaCompra, total, descuento, iva, tiquetes, usuario, fechaSalida, fechaRegreso } = req.body;
  const post = await FacturaModel.findOneAndUpdate(
    { _id: req.params.id },
    { cantidad,fechaCompra, total, descuento, iva, tiquetes, usuario, fechaSalida, fechaRegreso }, // ==> {activo: activo, nombre: nombre}
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(post);
};