const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  JWT_SECRET,
} = require("../config.js");

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
      { expiresIn: "1h" }
    );
  },
  getTareas: function (userId) {
    if (!this.connection) {
      throw new Error("Conexion con base de datos no inicializada");
    }

    return this.connection.execute(
      "SELECT * FROM tareas WHERE id_usuario = ?",
      [userId]
    );
  },
  createTarea: function ({ titulo, descripcion, estado, id_usuario }) {
    if (!this.connection) {
      throw new Error("Conexion con base de datos no inicializada");
    }

    return this.connection.execute(
      "INSERT INTO tareas(titulo, descripcion, estado, fecha_creacion, fecha_actualizacion, id_usuario) VALUES(?, ?, ?, ?, ?, ?)",
      [titulo, descripcion, estado, new Date(), new Date(), id_usuario]
    );
  },
  editTarea: function ({ titulo, descripcion, tarea_id }) {
    if (!this.connection) {
      throw new Error("Conexion con base de datos no inicializada");
    }

    if (!titulo) {
      return this.connection.execute(
        "UPDATE tareas SET descripcion = ? WHERE tareas.id = ?",
        [descripcion, tarea_id]
      );
    } else if (!descripcion) {
      return this.connection.execute(
        "UPDATE tareas SET titulo = ? WHERE tareas.id = ?",
        [titulo, tarea_id]
      );
    } else {
      return this.connection.execute(
        "UPDATE tareas SET titulo = ?, descripcion = ? WHERE tareas.id = ?",
        [titulo, descripcion, tarea_id]
      );
    }
  },
};
