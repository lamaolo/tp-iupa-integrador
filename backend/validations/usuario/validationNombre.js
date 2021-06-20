const { body } = require('express-validator');

module.exports = body('nombre')
  .trim()
  .notEmpty()
  .withMessage('Campo obligatorio')
  .bail()
  .isLength({ min: 3 })
  .withMessage('Debe tener 5 caracteres');