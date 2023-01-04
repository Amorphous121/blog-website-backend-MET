import Joi from 'joi';

import { ID_VALIDATION_REGEX } from 'utils/app.constants';

export const CreateUserValidation = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().required(),
    password: Joi.string().min(4).required()
  })
};

export const UpdateUserValidation = {
  body: Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    username: Joi.string().alphanum().optional(),
    password: Joi.string().min(4).optional()
  }).not({}),
  params: Joi.object({
    userId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid userId given!').required()
  })
};

export const UserLoginValidation = {
  body: Joi.object({
    usernameOrEmail: Joi.string().required(),
    password: Joi.string().required()
  })
};

export const DeleteUserValidation = {
  params: Joi.object({
    userId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid userId given!').required()
  })
};
