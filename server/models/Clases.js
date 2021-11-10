const { Schema, model } = require("mongoose");

const ClaseSchema = new Schema(
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

const ClaseModel = model("Clases", ClaseSchema);

module.exports = ClaseModel;