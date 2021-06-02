const tareasRouter = require("express").Router();
const tareasAPI = require("express").Router();

/* ENDPOINTS DE tareasRouter AQUI */

/* ENDPOINTS DE tareasRouter AQUI */

tareasAPI.use("/tareas", tareasRouter);

module.exports = tareasAPI;
