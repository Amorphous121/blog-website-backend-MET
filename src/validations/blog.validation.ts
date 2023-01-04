import Joi from 'joi';

import { ID_VALIDATION_REGEX } from 'utils/app.constants';

export const CreateBlogValidation = {
  body: Joi.object({
    title: Joi.string().min(5).message('Title should have min length of 5').required(),
    content: Joi.string().min(20).message('Content should have min lenght of 20f').required()
  }),
  params: Joi.object({
    userId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid userId given.').required()
  })
};

export const FetchAllBlogsValidation = {
  params: Joi.object({
    userId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid userId given.').required()
  })
};

export const FetchBlogByBlogId = {
  params: Joi.object({
    userId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid userId given.').required(),
    blogId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid blogId given.').required()
  })
};

export const UpdateBlogValidation = {
  params: Joi.object({
    userId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid userId given.').required(),
    blogId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid blogId given.').required()
  }),
  body: Joi.object({
    title: Joi.string().min(5).message('Title should have min length of 5').optional(),
    content: Joi.string().min(20).message('Content should have min lenght of 20f').optional()
  }).not({})
};

export const DeleteBlogValidation = {
  params: Joi.object({
    userId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid userId given.').required(),
    blogId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid blogId given.').required()
  })
};
