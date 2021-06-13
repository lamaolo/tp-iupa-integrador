const tareasRouter = require("express").Router();
const tareasAPI = require("express").Router();
const controller = require("./controller");

/* ENDPOINTS DE tareasRouter AQUI */

// -> localhost:3000/api/tareas
// Obtener todas las tareas
tareasRouter.get("/", (req, res) => {
  // req.user contiene todos los datos del JWT decodificados.
  controller
    .list(req.user.id) // user.id extraido del JWT
    .then((tareas) => res.status(200).json({ error: null, data: tareas }))
    .catch((error) =>
      res.status(500).json({ error: error.message, data: null })
    );
});

// Crear una tarea
tareasRouter.post("/", (req, res) => {
  const { titulo, descripcion } = req.body;

  controller
    .create({
      titulo,
      descripcion,
      estado: "pendiente",
      id_usuario: req.user.id, // se creara la tarea asociada al usuario que este logueado (el que mande el JWT)
    })
    .then((tareaCreada) =>
      res.status(201).json({ error: null, data: tareaCreada })
    )
    .catch((error) =>
      res.status(500).json({ error: error.message, data: null })
    );
});

// Editar una tarea
tareasRouter.put("/:id", (req, res) => {
  const { titulo, descripcion } = req.body;
  const { id: tarea_id } = req.params;

  controller
    .edit({ titulo, descripcion, tarea_id })
    .then((tareaEditada) =>
      res.status(200).json({ error: null, data: tareaEditada })
    )
    .catch((error) =>
      res.status(500).json({ error: error.message, data: null })
    );
});

/* ENDPOINTS DE tareasRouter AQUI */

tareasAPI.use("/tareas", tareasRouter);

module.exports = tareasAPI;
