import { Router } from 'express';
import { ping } from './ping';
import { errorMiddleware } from '../middleware/errorMiddleware';

const router = Router();

router.use('/ping', ping);

// catch 404
router.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

router.use(errorMiddleware);

export { router };
