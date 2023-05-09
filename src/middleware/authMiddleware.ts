import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const { ACCESS_TOKEN_SECRET } = process.env;

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) throw new Error('no access token');

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET as string);
    next();
  } catch {
    res.sendStatus(401);
  }
};
