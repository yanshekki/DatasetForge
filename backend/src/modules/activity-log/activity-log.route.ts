import { Router } from 'express';
import { getActivityLogs } from './activity-log.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateToken, getActivityLogs);

export default router;
