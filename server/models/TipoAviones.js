const { Schema, model } = require("mongoose");

const TipoAvionesSchema = new Schema(
  {
    marca: {
        type: String,
        required: true,
      },
    modelo: {
        type: String,
        required: true,
      },
    annio:{
        type: Number,
        required: true,
      },
      activo: {
        type: Boolean,
        default: "1",
      },
      
},
  { timestamps: true }
);

const TipoAvionesModel = model("TipoAviones", TipoAvionesSchema);

module.exports = TipoAvionesModel;