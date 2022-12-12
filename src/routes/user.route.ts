import { Router } from 'express';

import * as UserController from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.post('/', UserController.createUser);

export default userRouter;
