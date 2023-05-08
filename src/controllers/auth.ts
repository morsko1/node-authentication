import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { findOrCreateUser } from '../services/user';

const { CLIENT_ID, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

const client = new OAuth2Client(CLIENT_ID);

export const authGoogle = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('no id token');

    const ticket = await client.verifyIdToken({
      idToken: token as string,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) throw new Error('Can\'t get ticket payload');

    const { email } = payload;

    if (!email) throw new Error('Email error');

    const user = await findOrCreateUser(email);

    const accessToken = jwt.sign({ email: user.email }, ACCESS_TOKEN_SECRET as string, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign({ email: user.email }, REFRESH_TOKEN_SECRET as string);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    res.json({ user: { email: user.email }, accessToken });
  } catch (error) {
    console.error('Error verifying Google ID token', error);
    res.sendStatus(401);
  }
};

export const verifyToken = (req: Request, res: Response) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) throw new Error('no access token');

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET as string);
    res.sendStatus(200);
  } catch {
    res.sendStatus(401);
  }
};

export const refreshToken = (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) throw new Error('no refresh token');

    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET as string) as { email: string };

    const accessToken = jwt.sign({ email: decoded.email }, ACCESS_TOKEN_SECRET as string, {
      expiresIn: '15m',
    });

    res.json({ accessToken });
  } catch {
    res.sendStatus(401);
  }
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie('refreshToken');

  res.sendStatus(200);
};
