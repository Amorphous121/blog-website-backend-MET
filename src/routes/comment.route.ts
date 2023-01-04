import { Router } from 'express';

import * as CommentController from 'controllers/comment.controller';
import { checkAuthentication } from 'middlewares/auth.middleware';

const commentRouter = Router({ mergeParams: true });

commentRouter.get('/', checkAuthentication, CommentController.getAllComments);
commentRouter.get('/:commentId', checkAuthentication, CommentController.getCommentById);
commentRouter.post('/', checkAuthentication, CommentController.createComment);
commentRouter.put('/:commentId', checkAuthentication, () => {});
commentRouter.delete('/:commentId', checkAuthentication, () => {});

export default commentRouter;
