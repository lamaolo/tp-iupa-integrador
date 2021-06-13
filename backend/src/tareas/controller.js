const db = require("../database");

/* Metodo para listar las tareas */
const list = (userId) => {
  if (!userId) {
    return Promise.reject({ message: "El campo `userId` es obligatorio." });
  }

  return new Promise((resolve, reject) => {
    db.getTareas(userId)
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
const edit = ({ titulo, descripcion, tarea_id, id_usuario }) => {
  if ((!titulo && !descripcion) || !tarea_id) {
    return Promise.reject({
      message:
        "El campo `tarea_id` es obligatorio, y debes editar al menos uno de los campos `descripcion` o `titulo`.",
    });
  }
  return new Promise((resolve, reject) => {
    db.editTarea({ titulo, descripcion, tarea_id, id_usuario })
      .then(([tareaEditada]) => {
        if (!tareaEditada.affectedRows) {
          reject({
            message:
              "No tienes permisos para editar esta tarea porque la tarea fue creada por otro usuario.",
          });
        } else {
          resolve(tareaEditada);
        }
      })
      .catch((error) => reject(error));
  });
};

module.exports = {
  list,
  create,
  edit,
};
