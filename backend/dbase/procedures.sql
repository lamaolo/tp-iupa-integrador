USE sql_proyecto;

DELIMITER $$
USE `sql_proyecto`$$

CREATE PROCEDURE `usuariosAddOrEdit` (
  IN _id INT,
  IN Nombre VARCHAR(55),
  IN Apellido VARCHAR(55),
  IN correo VARCHAR(55)
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO usuarios (Nombre, Apellido, correo)
    VALUES (_Nombre, _Apellido, _correo);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE usuarios
    SET
    Nombre = _Nombre,
    Apellido = _Apellido,
    correo = _correo,
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END
