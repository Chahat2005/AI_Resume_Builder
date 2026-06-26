const validator = require('validator');

const sanitizeObject = (value) => {
  if (typeof value === 'string') {
    return validator.escape(value.trim());
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeObject);
  }
  if (typeof value === 'object' && value !== null) {
    const sanitized = {};
    Object.keys(value).forEach((key) => {
      sanitized[key] = sanitizeObject(value[key]);
    });
    return sanitized;
  }
  return value;
};

module.exports = (req, res, next) => {
  req.body = sanitizeObject(req.body);
  next();
};
