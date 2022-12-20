import { Router } from 'express';

import * as UserController from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:id', UserController.getUserById);
userRouter.post('/', UserController.createUser);

export default userRouter;
