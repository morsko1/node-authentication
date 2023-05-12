import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { errorHandler } from '../error/errorHandler';

export const errorMiddleware: ErrorRequestHandler = async (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  await errorHandler.handleRouteError(err, res);
};
