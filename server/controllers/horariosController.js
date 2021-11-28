const HorariosModel = require("../models/Horarios");

//Ponerle el populate
module.exports.get = async (req, res, next) => {
    const posts = await HorariosModel.find().populate("rutas").exec();
    res.json(posts);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const post = await HorariosModel.findOne({ _id: id }).populate("rutas").exec();
  res.json(post);
};

module.exports.create = (req, res, next) => {
  const { name, content } = req.body;
  const post = new HorariosModel({ ...req.body });
  post.save();
  res.json(post);
};

module.exports.delete = async (req, res, next) => {
  const post = await HorariosModel.findByIdAndRemove(req.params.id);
  // si post es null significa que no existe el registro
  if (post) {
    res.json({ result: `Horario borrado correctamente`, post });
  } else {
    res.json({ result: "Id de horario inválido", post });
  }
};

module.exports.update = async (req, res, next) => {
  const { fechaHoraSalida,fechaHoraLlegada, rutas, activo } = req.body;
  const post = await HorariosModel.findOneAndUpdate(
    { _id: req.params.id },
    { fechaHoraSalida,fechaHoraLlegada, rutas, activo }, // ==> {activo: activo, nombre: nombre}
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(post);
};