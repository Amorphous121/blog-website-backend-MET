import { Router } from 'express';

import * as CommentController from 'controllers/comment.controller';

const commentRouter = Router({ mergeParams: true });

commentRouter.get('/', CommentController.getAllComments);

commentRouter.get('/:commentId', CommentController.getCommentById);

commentRouter.post('/', CommentController.createComment);

commentRouter.put('/:commentId', () => {});

commentRouter.delete('/:commentId', () => {});

export default commentRouter;
