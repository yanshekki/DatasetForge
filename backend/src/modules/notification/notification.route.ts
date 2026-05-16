import { Router } from 'express';
import { getNotifications, markAsRead, markAllAsRead } from './notification.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateToken, getNotifications);
router.put('/:id/read', authenticateToken, markAsRead);
router.put('/read-all', authenticateToken, markAllAsRead);

export default router;
