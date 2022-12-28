import { Request, Response, NextFunction } from 'express';
import { VALIDATION_ENTITIES } from 'enums';
import { IValidationSchema } from 'interfaces/common.interface';

export const validate = (schema: IValidationSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const key of Object.values(VALIDATION_ENTITIES)) {
      if (schema[key] !== null) {
        req[key] = await schema[key].validateAsync(req[key]);
      }
    }
    next();
  }
};
