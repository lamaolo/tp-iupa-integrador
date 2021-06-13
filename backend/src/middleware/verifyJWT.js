const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const [bearer, token] = authHeader.split(" ");

    if (!token) {
      res.status(401).json({
        error: "Acceso denegado.",
        data: null,
      });
    } else {
      try {
        const verifyToken = jwt.verify(token, JWT_SECRET);

        // escribo el resultado del token decodificado en el objeto request
        req.user = verifyToken;
        next();
      } catch (error) {
        res.status(401).json({
          error: "Token invalido.",
          data: null,
        });
      }
    }
  } else {
    res.status(401).json({
      error:
        "Acceso denegado. Debes enviar el JWT en el header `authorization` con la sintaxis `Bearer {token}`.",
      data: null,
    });
  }
};

module.exports = verifyJWT;
