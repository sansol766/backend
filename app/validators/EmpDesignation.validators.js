const Joi =  require('joi');
const validator = schema => payload => schema.validate(payload);

const validateGetDesignation = Joi.object().keys({
    offset : Joi.number().required(),
    limit: Joi.number().required(),   
   });

const validateSaveDesignation = Joi.object().keys({
    designation : Joi.string().required()
  })

exports.validateGetDesignation = validator(validateGetDesignation);
exports.validateSaveDesignation = validator(validateSaveDesignation);