import { Request, Response, NextFunction, RequestHandler } from 'express';
import { VALIDATION_ENTITIES } from 'enums';
import { IValidationSchema } from 'interfaces/common.interface';

export const validate = (schema: IValidationSchema): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const key of Object.values(VALIDATION_ENTITIES)) {
        if (schema[key] !== undefined) {
          req[key] = await schema[key].validateAsync(req[key]);
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
