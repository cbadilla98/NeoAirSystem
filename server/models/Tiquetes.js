const { Schema, model } = require("mongoose");

const TiqueteSchema = new Schema(
  {
    nombre: {
        type: String,
        required: true,
      },
    precio: {
        type: Number,
        required: true,
      },
    destino: {
        type: String,
        required: true,
      },
    activo: {
        type: Boolean,
        default: "1",
      },
    fechaSalida: {
        type: Date,
        required: true,
      },
    aviones: [
        {
          type: Schema.Types.ObjectId,
          ref: "Aviones",
        },
    ],
    clases: [
        {
          type: Schema.Types.ObjectId,
          ref: "Clases",
        },
    ],
    tipoTiquete: [
        {
          type: Schema.Types.ObjectId,
          ref: "TipoTiquete",
        },
    ],
  },
  { timestamps: true }
);

const TiqueteModel = model("Tiquete", TiqueteSchema);

module.exports = TiqueteModel;