import { Router } from 'express';
import { getPreferences, updatePreferences } from './user.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/preferences', authenticateToken, getPreferences);
router.put('/preferences', authenticateToken, updatePreferences);

export default router;
