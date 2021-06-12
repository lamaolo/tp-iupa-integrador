const db = require("../database");

/* Metodo para listar las tareas */
const list = () => {
  return new Promise((resolve, reject) => {
    db.getTareas()
      .then(([tareas]) => resolve(tareas))
      .catch((error) => reject(error));
  });
};

/* Metodo para crear una tarea */
const create = (dataTarea) => {
  return new Promise((resolve, reject) => {
    db.createTarea(dataTarea)
      .then(([tareaCreada]) => resolve(tareaCreada))
      .catch((error) => reject(error));
  });
};

module.exports = {
  list,
  create,
};
