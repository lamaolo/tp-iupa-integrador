const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config");
const apiRouter = require("./src");
const db = require("./src/database");

const app = express();
// const db = new Database();

app.use(bodyParser.json());
app.use(apiRouter);

(async function initApp() {
  try {
    await db.initDB();
    console.log("[DATABASE]: Base de datos conectada.");

    app.listen(PORT, () => {
      console.log(`[SERVER]: Escuchando en: http://localhost:${PORT}.`);
    });
  } catch (error) {
    console.log(error);
  }
})();
