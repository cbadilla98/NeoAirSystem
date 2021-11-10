const { Schema, model } = require("mongoose");

const FacturaSchema = new Schema(
  {
    cantidad: {
        type: Number,
        required: true,
      },
    fechaCompra: {
        type: Date,
        required: true,
      },
    total: {
        type: Number,
        required: true,
      },
    descuento: {
        type: Number,
        required: true,
      },
    iva: {
        type: Number,
        required: true,
      },
    fechaSalida: {
        type: Date,
        required: true,
      },
    fechaRegreso:{
        type: Date,
        required: true,
      },
    usuario: [
        {
          type: Schema.Types.ObjectId,
          ref: "Usuario",
        },
    ],
    tiquetes: [
        {
          type: Schema.Types.ObjectId,
          ref: "Tiquetes",
        },
    ],
  },
  { timestamps: true }
);

const FacturaModel = model("Factura", FacturaSchema);

module.exports = FacturaModel;