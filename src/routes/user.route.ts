import { Router } from 'express';

import * as UserController from '../controllers/user.controller';
import { checkAuthentication, checkAuthorization } from 'middlewares/auth.middleware';

const userRouter = Router();

userRouter.get('/', checkAuthentication, checkAuthorization('admin'), UserController.getAllUsers);
userRouter.get('/:userId', UserController.getUserById);
userRouter.put('/:userId', () => {});
userRouter.delete('/:userId', () => {});

export default userRouter;
