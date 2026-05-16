import { Router } from 'express';
import { getActivityLogs, getActivityHeatmap } from './activity-log.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateToken, getActivityLogs);
router.get('/heatmap', authenticateToken, getActivityHeatmap);

export default router;
