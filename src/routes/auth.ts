import { Router } from 'express';
import { authGoogle, logout, refreshToken, verifyToken } from '../controllers/auth';

const auth = Router();

auth.post('/login/google', authGoogle);

auth.post('/verify', verifyToken);

auth.post('/refresh', refreshToken);

auth.post('/logout', logout);

export { auth };
