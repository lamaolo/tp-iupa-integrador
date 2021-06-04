const tareasRouter = require("express").Router();
const tareasAPI = require("express").Router();
const controller = require("./controller");

/* ENDPOINTS DE tareasRouter AQUI */

// -> localhost:3000/api/tareas
tareasRouter.get("/", (req, res) => {
  controller
    .list()
    .then((tareas) => res.status(200).json({ error: null, data: tareas }))
    .catch((error) =>
      res.status(500).json({ error: error.message, data: null })
    );
});

/* ENDPOINTS DE tareasRouter AQUI */

tareasAPI.use("/tareas", tareasRouter);

module.exports = tareasAPI;
