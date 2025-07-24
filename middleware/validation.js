const Joi = require('joi');

const validatePanelData = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().min(1).max(100),
    location: Joi.string().required().min(1).max(200),
    installation_date: Joi.date().iso().required(),
    status: Joi.bool().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: 'Validation Error',
      details: error.details[0].message
    });
  }
  next();
};

const validateMeasurementData = (req, res, next) => {
  const schema = Joi.object({
    voltage: Joi.number().required().min(0).max(50),
    temperature: Joi.number().required().min(-50).max(100),
    luminosity: Joi.number().required().min(0).max(2000)
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: 'Validation Error',
      details: error.details[0].message
    });
  }
  next();
};

const validateUserData = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().min(1).max(100),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(128).required(), // ← Password added here
    role: Joi.string().valid('customer', 'technician', 'admin').required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: 'Validation Error',
      details: error.details[0].message
    });
  }
  next();
};

module.exports = {
  validatePanelData,
  validateMeasurementData,
  validateUserData
};
