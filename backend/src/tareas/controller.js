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

/* Metodo para editar una tarea */
const edit = ({ titulo, descripcion, tarea_id }) => {
  if ((!titulo && !descripcion) || !tarea_id) {
    return Promise.reject({
      message:
        "El campo `tarea_id` es obligatorio, y debes editar al menos uno de los campos `descripcion` y `titulo`.",
    });
  }
  return new Promise((resolve, reject) => {
    db.editTarea({ titulo, descripcion, tarea_id })
      .then(([tareaEditada]) => resolve(tareaEditada))
      .catch((error) => reject(error));
  });
};

module.exports = {
  list,
  create,
  edit,
};
