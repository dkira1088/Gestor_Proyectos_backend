import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //Informacion email

  const info = await transport.sendMail({
    from: 'UpTask - Administrador de proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask - comprueba tu cuenta",
    text: "Comprueba tu cuenta",
    html: `<p>Hola: ${nombre} Comprueba tu cuenta en UpTask</p>
    <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace</p>
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>`,
  });
};

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //Informacion email
  const info = await transport.sendMail({
    from: 'UpTask - Administrador de proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask - Reestablecer tu password",
    text: "Reestablecer tu password",
    html: `<p>Hola: ${nombre}</p>
    <p>Actualiza tu password en el siguiente enlace</p>
    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer password</a>
    <p>Si tu no solicitaste actualizar el password, puedes ignorar el mensaje</p>`,
  });
};
