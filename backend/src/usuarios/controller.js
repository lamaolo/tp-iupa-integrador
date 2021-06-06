const db = require("../database");

/* Metodo para listar los usuarios */
const list = () => {
  return new Promise((resolve, reject) => {
    /* "Usuarios" de prueba. Aca tendria que traer info. real de la base de datos. */
    resolve([
      {
        id: 1,
        nombre: "Lucero",
        apellido: "Amaolo",
        password: "123456789",
        email: "lucero@example.com",
      },
      {
        id: 2,
        nombre: "Pedro",
        apellido: "example",
        password: "123456789",
        email: "pedro@example.com",
      },
    ]);
  });
};

/* Metodo para crear un usuario */
const create = ({ nombre, apellido, email, password }) => {
  if (!email || !password || !nombre || !apellido) {
    return Promise.reject({
      message:
        "Los campos `nombre`, `apellido`, `email` y `password` son obligatorios.",
    });
  }

  return new Promise((resolve, reject) => {
    db.registerUser({ nombre, apellido, email, password })
      .then(([usuarioCreado]) => resolve(usuarioCreado))
      .catch((error) => reject(error));
  });
};

module.exports = {
  list,
  create,
};
