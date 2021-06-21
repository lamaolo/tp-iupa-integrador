const { body } = require('express-validator');

module.exports = body('tarea')
  .trim()
  .notEmpty()
  .withMessage('Campo obligatorio. Describa su tarea')
  .bail()
  .isLength({ min: 10 })
  .withMessage('Debe tener 25 caracteres');