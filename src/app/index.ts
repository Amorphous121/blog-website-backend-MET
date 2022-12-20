import express from 'express';
import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import CONFIG from '../config';
import { stream } from 'utils/logger';
import IndexRouter from 'routes/index.route';
import ErrorHandler from 'middlewares/error.middleware';

const app = express();

/* Middleware stack */
app.use(cors({ origin: '*', credentials: CONFIG.CREDENTIALS }));
app.use(hpp());
app.use(helmet());
app.use(express.json());
app.use(morgan(`${CONFIG.isDev ? 'dev' : 'combined'}`, { stream }));

/* Register the main Route to application. */
app.use(IndexRouter);

/* Error Handling */
const errorHandler = new ErrorHandler();
app.use(errorHandler.notFoundRouteHandler);
app.use(errorHandler.validationErrorHandler);
app.use(errorHandler.mainHandler);

export default app;
