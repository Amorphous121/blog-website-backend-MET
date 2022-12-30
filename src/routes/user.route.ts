import { Router } from 'express';

import * as UserController from '../controllers/user.controller';
import { validate } from 'middlewares/validation.middleware';
import { CreateUserValidation } from 'validations/user.validation';
import { checkAuthentication, checkAuthorization } from 'middlewares/auth.middleware';

const userRouter = Router();

userRouter.get('/', checkAuthentication, checkAuthorization('admin'), UserController.getAllUsers);
userRouter.get('/:id', UserController.getUserById);
userRouter.post('/', validate(CreateUserValidation), UserController.createUser);

export default userRouter;
