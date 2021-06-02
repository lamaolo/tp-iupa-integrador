const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./src/config");

const app = express();

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`[SERVER]: Escuchando en: http://localhost:${PORT}`);
});
