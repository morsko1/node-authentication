import { Router } from 'express';
import { authGoogle, logout, refreshToken, verifyToken } from '../controllers/auth.controller';

const router = Router();

router.post('/login/google', authGoogle);

router.post('/verify', verifyToken);

router.post('/refresh', refreshToken);

router.post('/logout', logout);

export { router as authRouter };
