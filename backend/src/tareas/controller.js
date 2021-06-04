/* Metodo para listar las tareas */
const list = () => {
  return new Promise((resolve, reject) => {
    /* "Tareas" de prueba. Aca tendria que traer info. real de la base de datos. */
    resolve([
      {
        id: 1,
        titulo: "Tarea de prueba",
        descripcion: "Descripcion para la tarea aqui",
        estado: "pendiente",
        fecha_creacion: new Date(),
        fecha_actualizacion: new Date(),
        id_usuario: 1,
      },
      {
        id: 2,
        titulo: "Otra tarea mas de prueba",
        descripcion: "Descripcion para la tarea aqui",
        estado: "pendiente",
        fecha_creacion: new Date(),
        fecha_actualizacion: new Date(),
        id_usuario: 1,
      },
    ]);
  });
};

/* Metodo para crear una tarea */
const create = () => {};

module.exports = {
  list,
  create,
};
