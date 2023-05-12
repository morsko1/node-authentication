import { Router } from 'express';
import { getAllUsers } from '../services/user.service';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ data: 'protected data' });
});

router.get('/users', async (_req, res) => {
  const allUsers = await getAllUsers();
  res.json(allUsers);
});

export { router as dataRouter };
