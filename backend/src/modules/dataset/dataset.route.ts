import { Router } from 'express';
import { getAllDatasets, getDatasetById, createDataset, updateDataset, deleteDataset, incrementDownload } from './dataset.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateToken, getAllDatasets);
router.get('/:id', authenticateToken, getDatasetById);
router.post('/', authenticateToken, createDataset);
router.put('/:id', authenticateToken, updateDataset);
router.delete('/:id', authenticateToken, deleteDataset);
router.post('/:id/download', authenticateToken, incrementDownload);

export default router;
