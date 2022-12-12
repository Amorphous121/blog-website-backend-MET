import express from 'express';
import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import CONFIG from '../config';
import { stream } from 'utils/logger';
import IndexRouter from 'routes/index.route';

const app = express();

/* Middleware stack */
app.use(cors({ origin: '*', credentials: CONFIG.CREDENTIALS }));
app.use(hpp());
app.use(helmet());
app.use(express.json());
app.use(morgan(`${CONFIG.isDev ? 'dev' : 'combined'}`, { stream }));

/* Register the main Route to application. */
app.use(IndexRouter);

export default app;
