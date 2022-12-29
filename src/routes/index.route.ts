import { Router } from 'express';

import userRouter from './user.route';
import authRouter from './auth.route';

const IndexRouter = Router();

IndexRouter.use('/users', userRouter);
IndexRouter.use('/auth', authRouter);

export default IndexRouter;
