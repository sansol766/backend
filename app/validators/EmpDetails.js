const Joi = require("joi");
const validator = schema => payloads => schema.validate(payloads);


const validateGetEmpDetails = Joi.object().keys({
    offset : Joi.number().required(),
    limit : Joi.number().required(),
    name : Joi.string().regex(/[a-z]/).optional(),
    phone : Joi.number().optional(),
    email : Joi.string().email().optional(),
    country : Joi.string().optional(),
    fromdate : Joi.date().optional(),
 });

 const validateSaveEmpDetails = Joi.object().keys({
      name : Joi.string().required(),
      phone : Joi.number().required(),
      email : Joi.string().email().required(),
      country : Joi.string().required(),
      password : Joi.string().required()
 });

 const validateUpdateEmpDetails = Joi.object().keys({
   id : Joi.number().required(),
   name : Joi.string().optional(),
   phone : Joi.number().optional(),
   country : Joi.string().optional(),
   createdat : Joi.string().optional(),
   designation_id : Joi.number().optional(),
   updatedat : Joi.string().optional()
})

exports.validateUpdateEmpDetails = validator(validateUpdateEmpDetails);
exports.validateSaveEmpDetails = validator(validateSaveEmpDetails);
exports.validateGetEmpDetailsSchema = validator(validateGetEmpDetails);