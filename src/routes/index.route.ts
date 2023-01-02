import { Router } from 'express';

import userRouter from './user.route';
import authRouter from './auth.route';
import blogRouter from './blog.route';
import commentRouter from './comment.route';

const IndexRouter = Router();

IndexRouter.use('/gg/:id/pp/:pd', (req, res, next) => {
  return res.json(req.params);
});

IndexRouter.use('/auth', authRouter);
IndexRouter.use('/users', userRouter);
IndexRouter.use('/users/:userId/blogs', blogRouter);
IndexRouter.use('/users/:userId/blogs/:blogId/comments', commentRouter);

export default IndexRouter;
