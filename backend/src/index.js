const apiRouter = require("express").Router();

const usuariosAPI = require("./usuarios");
const tareasAPI = require("./tareas");

apiRouter.use("/api", usuariosAPI);
apiRouter.use("/api", tareasAPI);

module.exports = apiRouter;
