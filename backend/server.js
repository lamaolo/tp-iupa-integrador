const fs = require("fs");

// autogenerar archivo config.js para modo de produccion
if (process.env.NODE_ENV === "production") {
  fs.writeFileSync(
    "config.js",
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

// resto de configuracion
const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./src");
const db = require("./src/database");

const app = express();

app.use(bodyParser.json());
app.use(apiRouter);

(async function initApp() {
  try {
    await db.initDB();
    console.log("[DATABASE]: Base de datos conectada.");

    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `[SERVER]: Escuchando en: http://localhost:${process.env.PORT || 3000}.`
      );
    });
  } catch (error) {
    console.log(error);
  }
})();
