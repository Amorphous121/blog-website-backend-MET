import { Router } from 'express';

import * as CommentController from 'controllers/comment.controller';
import { checkAuthentication } from 'middlewares/auth.middleware';
import { validate } from 'middlewares/validation.middleware';
import {
  CreateCommentValidation,
  DeleteCommentValidation,
  FetchAllCommentsValidation,
  FetchCommentByIdValidation,
  UpdateCommentValidation
} from 'validations/comment.validation';

const commentRouter = Router({ mergeParams: true });

commentRouter.get('/', checkAuthentication, validate(FetchAllCommentsValidation), CommentController.getAllComments);
commentRouter.get('/:commentId', checkAuthentication, validate(FetchCommentByIdValidation), CommentController.getCommentById);
commentRouter.post('/', checkAuthentication, validate(CreateCommentValidation), CommentController.createComment);
commentRouter.put('/:commentId', checkAuthentication, validate(UpdateCommentValidation), () => {});
commentRouter.delete('/:commentId', checkAuthentication, validate(DeleteCommentValidation), () => {});

export default commentRouter;
