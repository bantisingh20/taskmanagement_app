// validators/user.validator.js
const Joi = require('joi');

exports.getUserById = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });

  const { error } = schema.validate(req.params);
  if (error) return res.status(400).json({ message: error.message });
  next();
};
