const { validationResult } = require('express-validator');
const { ValidationError } = require('./validationError');

module.exports = (req, _, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array());
  }

  next();
};