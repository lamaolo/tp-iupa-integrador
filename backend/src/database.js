const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = require("../config");

module.exports = {
  connection: null,
  initDB: async function () {
    if (!this.connection) {
      this.connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
      });
    }
  },
  registerUser: async function ({ nombre, apellido, email, password }) {
    if (!this.connection) {
      throw new Error("Conexion con base de datos no inicializada");
    }

    // Hasehar el password para no guardarlo en texto plano.
    const rounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, rounds);

    return this.connection.execute(
      "INSERT INTO usuarios(nombre, apellido, email, password) VALUES(?, ?, ?, ?)",
      [nombre, apellido, email, hashedPassword]
    );
  },
};
