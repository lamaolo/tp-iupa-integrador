const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config");
const apiRouter = require("./src");

const app = express();

app.use(bodyParser.json());
app.use(apiRouter);

app.listen(PORT, () => {
  console.log(`[SERVER]: Escuchando en: http://localhost:${PORT}`);
});
