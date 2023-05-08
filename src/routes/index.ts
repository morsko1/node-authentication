import { Router } from 'express';
import { errorMiddleware } from '../middleware/errorMiddleware';
import { ping } from './ping';
import { auth } from './auth';

const router = Router();

router.use('/ping', ping);
router.use('/auth', auth);

// catch 404
router.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

router.use(errorMiddleware);

export { router };
