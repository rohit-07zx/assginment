import Joi from "joi";
import { errorHandler } from "../constant/errorhandler.js";
import { ValidationException } from "../utils/api.error.js";

const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.base": errorHandler.user.stringBase("Username"),
      "string.empty": errorHandler.user.stringEmpty("Username"),
      "string.min": errorHandler.user.stringMin,
      "any.required": errorHandler.user.anyRequired("Username"),
      "string.alphanum": "Name must only contain alpha-numeric characters",
    }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.base": errorHandler.user.stringBase("Password"),
      "string.pattern.base": errorHandler.user.isPassword,
      "string.empty": errorHandler.user.stringEmpty("Password"),
    }),

  email: Joi.string()
    .email()
    .messages({
      "string.base": errorHandler.user.stringBase("Email"),
      "string.email": errorHandler.user.isEmail,
      "string.empty": errorHandler.user.stringEmpty("Email"),
    }),
  city: Joi.string()
    .required()
    .messages({
      "string.base": errorHandler.user.stringBase("City"),
      "any.required": errorHandler.user.anyRequired("City"),
      "string.empty": errorHandler.user.stringEmpty("City"),
    }),
  zipcode: Joi.number()
    .required()
    .messages({
      "any.required": errorHandler.user.anyRequired("Zipcode"),
      "string.empty": errorHandler.user.stringEmpty("Zipcode"),
      "string.base": errorHandler.user.numberBase("Zipcode"),
    }),
  age: Joi.number()
    .min(18)
    .max(100)
    .required()
    .messages({
      "any.required": errorHandler.user.anyRequired("Age"),
      "string.empty": errorHandler.user.stringEmpty("Age"),
      "string.base": errorHandler.user.numberBase("Age"),
    }),
});

export const uservalidator = async (data) => {
  const { error, value } = schema.validate(data);

  if (error) {
    throw new ValidationException(401, error.details[0].message);
  }
};
