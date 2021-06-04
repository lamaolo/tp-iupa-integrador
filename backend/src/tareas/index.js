const tareasRouter = require("express").Router();
const tareasAPI = require("express").Router();

/* ENDPOINTS DE tareasRouter AQUI */

// -> localhost:3000/api/tareas
tareasRouter.get("/", (req, res) => {
  res.status(200).json({ error: null, data: "Estas en /api/tareas!" });
});

/* ENDPOINTS DE tareasRouter AQUI */

tareasAPI.use("/tareas", tareasRouter);

module.exports = tareasAPI;
