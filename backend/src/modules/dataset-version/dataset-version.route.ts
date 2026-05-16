import { Router } from 'express';
import { getVersions, getVersionById, createVersion, incrementVersionDownload } from './dataset-version.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';
import { requireDatasetAccess } from '../../middlewares/permission.middleware';

const router = Router();

router.get('/', authenticateToken, requireDatasetAccess, getVersions);
router.get('/compare', authenticateToken, requireDatasetAccess, compareVersions);
router.get('/:id', authenticateToken, requireDatasetAccess, getVersionById);
router.post('/', authenticateToken, requireDatasetAccess, createVersion);
router.post('/:id/download', authenticateToken, requireDatasetAccess, incrementVersionDownload);

export default router;
