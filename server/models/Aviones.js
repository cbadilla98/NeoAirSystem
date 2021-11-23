const { Schema, model } = require("mongoose");

const AvionesSchema = new Schema(
  {
    descripcion: {
      type: String,
      unique: true,
    },
    activo: {
        type: Boolean,
        default: "1",
      },
    tipoAviones: [
        {
          type: Schema.Types.ObjectId,
          ref: "TipoAviones",
        },
    ],
  },
  { timestamps: true }
);

const AvionesModel = model("Aviones", AvionesSchema);

module.exports = AvionesModel;