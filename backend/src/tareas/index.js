const tareasRouter = require("express").Router();
const tareasAPI = require("express").Router();
const controller = require("./controller");

/* ENDPOINTS DE tareasRouter AQUI */

// -> localhost:3000/api/tareas
// Obtener todas las tareas
tareasRouter.get("/", (req, res) => {
  controller
    .list()
    .then((tareas) => res.status(200).json({ error: null, data: tareas }))
    .catch((error) =>
      res.status(500).json({ error: error.message, data: null })
    );
});

// Crear una tarea
tareasRouter.post("/", (req, res) => {
  const { titulo, descripcion, id_usuario } = req.body;

  controller
    .create({ titulo, descripcion, estado: "pendiente", id_usuario })
    .then((tareaCreada) =>
      res.status(201).json({ error: null, data: tareaCreada })
    )
    .catch((error) =>
      res.status(500).json({ error: error.message, data: null })
    );
});

/* ENDPOINTS DE tareasRouter AQUI */

tareasAPI.use("/tareas", tareasRouter);

module.exports = tareasAPI;
