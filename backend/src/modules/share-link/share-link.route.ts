import { Router } from 'express';
import { createShareLink, getSharedDataset, revokeShareLink } from './share-link.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/datasets/:id/share-links', authenticateToken, createShareLink);
router.get('/shared/:token', getSharedDataset);
router.delete('/share-links/:token', authenticateToken, revokeShareLink);

export default router;
