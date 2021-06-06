const usuariosRouter = require("express").Router();
const usuariosAPI = require("express").Router();
const controller = require("./controller");

/* ENDPOINTS DE usuariosRouter AQUI */

// -> localhost:3000/api/usuarios
usuariosRouter.post("/register", (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  controller
    .create({ nombre, apellido, email, password })
    .then((usuarioCreado) =>
      res.status(201).json({ error: null, data: usuarioCreado })
    )
    .catch((error) =>
      res.status(500).json({ error: error.message, data: null })
    );
});

usuariosRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  controller
    .login({ email, password })
    .then((data) => res.status(201).json({ error: null, data }))
    .catch((error) =>
      res.status(500).json({ error: error.message, data: null })
    );
});
/* ENDPOINTS DE usuariosRouter AQUI */

usuariosAPI.use("/usuarios", usuariosRouter);

module.exports = usuariosAPI;
