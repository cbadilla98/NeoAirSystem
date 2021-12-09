const { Schema, model } = require("mongoose");

const OfertasClaseSchema = new Schema(
  {
    descuento: {
        type: Number,
        required: true,
      },
    fechaCreacion: {
        type: Date,
        // required: true,
        default: Date.now
      },
    fechaVencimiento: {
        type: Date,
        required: true,
      },
    activo: {
        type: Boolean,
        default: "1",
      },
    tiquetes: [
        {
          type: Schema.Types.ObjectId,
          ref: "Tiquete",
        },
    ],
},
  { timestamps: true }
);

const OfertasClaseModel = model("Ofertas", OfertasClaseSchema);

module.exports = OfertasClaseModel;