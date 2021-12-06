const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');
const UsuarioSchema = new Schema(
  {
    usuario:{
        type: String,
        unique: true,
        required: true,
      },
    contrasennia: {
        type: String,
        required: true,
      },
    nombre: {
        type: String,
        required: true,
      },
    apellidos: {
        type: String,
        required: true,
      },
    correo: {
        type: String,
        required: true,
      },
    fechaNacimiento: {
        type: Date,
        required: true,
      },
    lt: Number,
    ln: Number,
    telefonoTrabajo: String,
    telefonoCelular: {
        type: String,
        required: true,
      },
    activo: {
        type: Boolean,
        default: "1",
      },
    tipoUsuario: [
        {
          type: Schema.Types.ObjectId,
          ref: "TipoUsuario",
        },
    ],
  },
  { timestamps: true }
);

UsuarioSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.contrasennia, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UsuarioSchema.methods.comparePassword = async (passw, userPassw, cb) => {
    bcrypt.compare(passw, userPassw, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

const UsuarioModel = model("Usuario", UsuarioSchema);

module.exports = UsuarioModel;