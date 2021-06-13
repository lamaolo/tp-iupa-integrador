const apiRouter = require("express").Router();
const verifyToken = require("../middleware/verifyJWT");
const usuariosAPI = require("./usuarios");
const tareasAPI = require("./tareas");

apiRouter.use("/api", usuariosAPI);

// Middleware de verifyToken: Todas las request que se hagan a /api/usuarios deben enviar un token
apiRouter.use("/api", verifyToken, tareasAPI);

module.exports = apiRouter;
