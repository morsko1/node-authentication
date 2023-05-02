import { Router } from 'express';
import db from '../db/dbClient';

const ping = Router();

ping.get('/', (_req, res) => {
  res.send('pong');
});

ping.get('/users', async (_req, res) => {
  const allUsers = await db.user.findMany();
  res.json(allUsers);
});

export { ping };
