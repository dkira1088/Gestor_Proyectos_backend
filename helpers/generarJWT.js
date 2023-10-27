import jwt from "jsonwebtoken";

/**
 * crea un token de autenticación
 * @param {string} user id
 * @returns token
 */
const generarJWT = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

export default generarJWT;
