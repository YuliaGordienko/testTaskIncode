const createError = require("http-errors");
const validation = (schema) => {
  const validationMiddleware = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const newError = new createError(400, `Enter all need fields`);
      next(newError);
    }
    next();
  };
  return validationMiddleware;
};
module.exports = validation;
