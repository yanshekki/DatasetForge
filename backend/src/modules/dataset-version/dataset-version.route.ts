import { Router } from 'express';
import { DatasetVersionController } from './dataset-version.controller';

const router = Router({ mergeParams: true });

router.post('/', DatasetVersionController.create);
router.get('/', DatasetVersionController.findByDataset);

export default router;
