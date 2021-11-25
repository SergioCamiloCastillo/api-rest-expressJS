const boom = require("@hapi/boom");


function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    //abortEarly sirve para arrojar todos los posibles errores que vayan a existir en todas las validaciones
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}
module.exports = validatorHandler;
