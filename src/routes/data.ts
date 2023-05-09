import { Router } from 'express';

const data = Router();

data.get('/', (_req, res) => {
  res.json({ data: 'protected data' });
});

export { data };
