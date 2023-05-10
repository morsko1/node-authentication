import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { findOrCreateUser, findUser } from '../services/user';
import { UserDTO } from '../core/user';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60 * 1000;
const ACCESS_TOKEN_EXPIRES_IN = '15m';

const client = new OAuth2Client();

export const authGoogle = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No id token');

    const ticket = await client.verifyIdToken({ idToken: token as string });
    const payload = ticket.getPayload();
    if (!payload) throw new Error("Can't get ticket payload");

    const { email } = payload;
    if (!email) throw new Error('Email error');

    const user = await findOrCreateUser(email);

    const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET as string, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET as string);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    res.json({ user, accessToken });
  } catch (error) {
    console.error('Error verifying Google ID token', error);
    res.sendStatus(401);
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) throw new Error('no access token');

    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET as string) as UserDTO;
    const { email } = decoded;

    const user = await findUser(email);

    res.json({ user });
  } catch {
    res.sendStatus(401);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) throw new Error('no refresh token');

    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET as string) as UserDTO;

    const user = await findUser(decoded.email);
    if (!user) throw new Error('user not found');

    const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET as string, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    res.json({ user, accessToken });
  } catch {
    res.sendStatus(401);
  }
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie('refreshToken');

  res.sendStatus(200);
};
