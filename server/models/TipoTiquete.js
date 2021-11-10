const { Schema, model } = require("mongoose");

const TipoTiqueteSchema = new Schema(
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

const TipoTiqueteModel = model("TipoTiquete", TipoTiqueteSchema);

module.exports = TipoTiqueteModel;