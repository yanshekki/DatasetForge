import { Router } from 'express';
import { getAllDatasets, getDatasetById, createDataset, updateDataset, deleteDataset } from './dataset.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateToken, getAllDatasets);
router.get('/:id', authenticateToken, getDatasetById);
router.post('/', authenticateToken, createDataset);
router.put('/:id', authenticateToken, updateDataset);
router.delete('/:id', authenticateToken, deleteDataset);

export default router;
