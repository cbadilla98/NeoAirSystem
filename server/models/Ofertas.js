const { Schema, model } = require("mongoose");

const OfertasClaseSchema = new Schema(
  {
    descuento: {
        type: Number,
        required: true,
      },
    fechaCreacion: {
        type: Date,
        required: true,
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
          ref: "Tiquetes",
        },
    ],
},
  { timestamps: true }
);

const OfertasClaseModel = model("Ofertas", OfertasClaseSchema);

module.exports = OfertasClaseModel;