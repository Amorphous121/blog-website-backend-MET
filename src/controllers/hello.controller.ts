import { RequestHandler } from 'express';

export const sayHello: RequestHandler = (req, res, next) => {
  res.send('Hello from express!');
};
