import { Router } from 'express';
import { errorMiddleware } from '../middleware/errorMiddleware';
import { isAuthenticated } from '../middleware/authMiddleware';
import { ping } from './ping';
import { auth } from './auth';
import { data } from './data';

const router = Router();

router.use('/ping', ping);
router.use('/auth', auth);

// protected route
router.use('/data', isAuthenticated, data);

// catch 404
router.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

router.use(errorMiddleware);

export { router };
