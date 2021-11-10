const { Schema, model } = require("mongoose");

const HorariosSchema = new Schema(
  {
    
    fechaHoraSalida: {
        type: String,
        required: true,
      },
    fechaHoraLlegada: {
        type: String,
        required: true,
      },
    activo: {
        type: Boolean,
        default: "1",
      },
    rutas: [
        {
          type: Schema.Types.ObjectId,
          ref: "Rutas",
        },
    ],
  },
  { timestamps: true }
);

const HorariosModel = model("Horarios", HorariosSchema);

module.exports = HorariosModel;