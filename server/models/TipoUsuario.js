const { Schema, model } = require("mongoose");

const TipoUsuarioSchema = new Schema(
  {
    nombre: {
        type: String,
        required: true,
      },
    activo: {
        type: Boolean,
        default: "1",
      },
},
  { timestamps: true }
);

const TipoUsuarioModel = model("TipoUsuario", TipoUsuarioSchema);

module.exports = TipoUsuarioModel;