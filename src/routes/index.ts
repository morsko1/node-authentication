import { Router } from 'express';
import { errorMiddleware } from '../middleware/error.middleware';
import { isAuthenticated } from '../middleware/auth.middleware';
import { pingRouter } from './ping.router';
import { authRouter } from './auth.router';
import { dataRouter } from './data.router';

const router = Router();

router.use('/ping', pingRouter);
router.use('/auth', authRouter);

// protected route
router.use('/data', isAuthenticated, dataRouter);

// catch 404
router.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

router.use(errorMiddleware);

export { router };
