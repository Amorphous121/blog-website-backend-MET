import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';
import { logger } from '../utils/logger';
import { NODE_ENVs } from 'enums';
import CONFIG from 'config';
import HttpException from 'exception/HttpException';

class ErrorHandler {
  private readonly getErrorMessage = (error: ValidationError): string => {
    const {
      details: [{ message = 'Something went wrong!' }]
    } = error;

    return message;
  };

  public mainHandler = (err: HttpException, req: Request, res: Response, next: NextFunction): void => {
    if (CONFIG.NODE_ENV === NODE_ENVs.DEVELOPMENT) {
      console.log(err);
    }

    const { message = 'Something Went Wrong!' } = err;
    const { status = 500 } = err;

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ message });
  };

  public validationErrorHandler = (err: HttpException | ValidationError, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof ValidationError && err.isJoi) {
      const transformedError = new HttpException(422, this.getErrorMessage(err));
      return this.mainHandler(transformedError, req, res, next);
    } else if (!(err instanceof HttpException)) {
      const transformedError = new HttpException((err as any).status, err.message);
      return this.mainHandler(transformedError, req, res, next);
    }
    return this.mainHandler(err, req, res, next);
  };

  public notFoundRouteHandler = (req: Request, res: Response, next: NextFunction): void => {
    const httpException = new HttpException(404, 'Page not found!');
    return this.mainHandler(httpException, req, res, next);
  };
}

export default ErrorHandler;
