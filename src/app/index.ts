import express from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import CONFIG from '../config';
import { stream } from 'utils/logger';
import UserModel from 'models/user.model';

const app = express();

app.use(cors({ origin: '*', credentials: CONFIG.CREDENTIALS }));
app.use(hpp());
app.use(helmet());
app.use(express.json());
app.use(morgan(`${CONFIG.isDev ? 'dev' : 'combined'}`, { stream }));

const fun = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const users = await UserModel.find().lean();
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

app.get('/', fun);

export default app;
