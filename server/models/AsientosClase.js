const { Schema, model } = require("mongoose");

const AsientosClaseSchema = new Schema(
  {
    cantidadPasajeros: {
        type: Number,
        required: true,
      },
    cantidadFilas: {
        type: Number,
        required: true,
      },
    cantidadAsientosPorFila: {
        type: Number,
        required: true,
      },
    clase: [
        {
          type: Schema.Types.ObjectId,
          ref: "Clase",
        },
    ],
    tipoAviones: [
        {
          type: Schema.Types.ObjectId,
          ref: "TipoAviones",
        },
    ],
},
  { timestamps: true }
);

const AsientosClaseModel = model("AsientosClase", AsientosClaseSchema);

module.exports = AsientosClaseModel;