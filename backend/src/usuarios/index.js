const usuariosRouter = require("express").Router();
const usuariosAPI = require("express").Router();
const controller = require("./controller");

/* ENDPOINTS DE usuariosRouter AQUI */
usuariosRouter.get("/", (req, res) => {
  controller
    .list()
    .then((usuarios) => res.status(200).json({ error: null, data: usuarios }))
    .catch((error) =>
      res.status(500).json({ error: error.message, data: null })
    );
});
/* ENDPOINTS DE usuariosRouter AQUI */

usuariosAPI.use("/usuarios", usuariosRouter);

module.exports = usuariosAPI;
