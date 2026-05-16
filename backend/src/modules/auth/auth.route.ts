import { Router } from 'express';
import { register, login, updateProfile, changePassword } from './auth.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.put('/profile', authenticateToken, updateProfile);
router.put('/change-password', authenticateToken, changePassword);

export default router;
