import { Router } from 'express';
import { getVersions, getVersionById, createVersion, compareVersions } from './dataset-version.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';
import { requireDatasetAccess } from '../../middlewares/permission.middleware';

const router = Router();

router.get('/', authenticateToken, requireDatasetAccess, getVersions);
router.get('/compare', authenticateToken, requireDatasetAccess, compareVersions);
router.get('/:id', authenticateToken, requireDatasetAccess, getVersionById);
router.post('/', authenticateToken, requireDatasetAccess, createVersion);

export default router;
