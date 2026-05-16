import { Router } from 'express';
import { getPreferences, updatePreferences, updateProfilePicture } from './user.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/preferences', authenticateToken, getPreferences);
router.put('/preferences', authenticateToken, updatePreferences);
router.put('/profile-picture', authenticateToken, updateProfilePicture);

export default router;
