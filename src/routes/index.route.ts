import { Router } from 'express';

import userRouter from './user.route';

const IndexRouter = Router();

IndexRouter.use('/users', userRouter);

export default IndexRouter;
