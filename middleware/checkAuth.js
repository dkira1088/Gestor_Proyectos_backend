import jwt from "jsonwebtoken";
import Usuario from "../Models/Usuario.js";
const checkAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      req.usuario = await Usuario.findById(decoded.id).select(
        "-password -confirmado -token -createdAt -updatedAt -__v"
      );

      return next();
    } catch (error) {
      return res.status(404).json({ msg: "Hubo un error" });
    }
  }

  if (!token) {
    const error = new Error("Token no valido");
    return res.status(401).json({ msg: error.message });
  }
};

export default checkAuth;
