const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  JWT_SECRET,
} = require("../config");

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
  loginUser: async function ({ email, password }) {
    if (!this.connection) {
      throw new Error("Conexion con base de datos no inicializada");
    }

    const [[userInDB]] = await this.connection.execute(
      `SELECT * FROM usuarios WHERE usuarios.email = ?`,
      [email]
    );

    if (!userInDB) throw new Error("Usuario o password erroneo.");

    // Checkear si la contrasena ingresada es la misma que la guardada en base de datos (encriptada)
    const testPassword = await bcrypt.compare(password, userInDB.password);

    if (!testPassword) throw new Error("Usuario o password erroneo.");

    return jwt.sign(
      {
        id: userInDB.id,
        nombre: userInDB.nombre,
        apellido: userInDB.apellido,
        email: userInDB.email,
      },
      JWT_SECRET,
      { expiresIn: "35m" }
    );
  },
};
