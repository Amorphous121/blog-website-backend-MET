import { Router } from 'express';

const commentRouter = Router({ mergeParams: true });

commentRouter.get('/', () => {});
commentRouter.get('/:commentId', () => {});
commentRouter.post('/', () => {});
commentRouter.put('/:commentId', () => {});
commentRouter.delete('/:commentId', () => {});

export default commentRouter;
