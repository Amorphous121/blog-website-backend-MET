import Joi from 'joi';

import { ID_VALIDATION_REGEX } from 'utils/app.constants';

export const CreateCommentValidation = {
  params: Joi.object({
    userId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid userId').required(),
    blogId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid blogId').required()
  }),
  body: Joi.object({
    comment: Joi.string().required()
  })
};

export const FetchAllCommentsValidation = {
  params: Joi.object({
    userId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid userId').required(),
    blogId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid blogId').required()
  })
};

export const FetchCommentByIdValidation = {
  params: Joi.object({
    userId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid userId').required(),
    blogId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid blogId').required()
  })
};

export const UpdateCommentValidation = {
  params: Joi.object({
    userId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid userId').required(),
    blogId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid blogId').required(),
    commentId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid commentId').required()
  }),
  body: Joi.object({
    comment: Joi.string().optional()
  }).not({})
};

export const DeleteCommentValidation = {
  params: Joi.object({
    userId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid userId').required(),
    blogId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid blogId').required(),
    commentId: Joi.string().regex(ID_VALIDATION_REGEX).message('Invalid commentId').required()
  })
};
