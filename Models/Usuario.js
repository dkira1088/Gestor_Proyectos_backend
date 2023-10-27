import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//hooks y midlewares de mongo
//revisar documentación

/**
 * Crea un password hash para pasarlo a la BD
 */
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //next ejecuta el siguiente middleware
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Compara el password hash de la petición contra el password hash de la BD
 * @param {*} password
 * @returns {Boolean}
 */
usuarioSchema.methods.comprobarPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
