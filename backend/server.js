const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config");
const apiRouter = require("./src");
const db = require("./src/database");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());
app.use(apiRouter);

// autogenerar archivo config.js para modo de produccion
if (process.env.NODE_ENV === "production") {
  fs.writeFileSync(
    "./config.js",
    `
  module.exports = {
    PORT: 3000,
    DB_NAME: "${process.env.DB_NAME}",
    DB_HOST: "${process.env.DB_HOST}",
    DB_PASSWORD: "${process.env.DB_PASSWORD}",
    DB_USER: "${process.env.DB_USER}",
    JWT_SECRET: "${process.env.JWT_SECRET}",
  };
  `
  );
}

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
