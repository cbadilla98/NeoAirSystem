const { Schema, model } = require("mongoose");

const RutasSchema = new Schema(
  {
    
    salida: {
        type: String,
        required: true,
      },
    destino: {
        type: String,
        required: true,
      },
    duracion:{
        type: Date,
        required: true,
      },
    activo: {
        type: Boolean,
        default: "1",
      },
    aviones: [
        {
          type: Schema.Types.ObjectId,
          ref: "Aviones",
        },
    ],
  },
  { timestamps: true }
);

const RutasModel = model("Rutas", RutasSchema);

module.exports = RutasModel;