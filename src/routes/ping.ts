import { Router } from 'express';

const ping = Router();

ping.get('/', (_req, res) => {
  res.send('pong');
});

export { ping };
