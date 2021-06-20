const db = require("../database");

/* Metodo para listar los usuarios */
const login = ({ email, password }) => {
  if (!email || !password) {
    return Promise.reject({
      message: "Los campos `email` y `password` son obligatorios.",
    });
  }

  return new Promise((resolve, reject) => {
    db.loginUser({ email, password })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
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
  login,
  create,
};
 