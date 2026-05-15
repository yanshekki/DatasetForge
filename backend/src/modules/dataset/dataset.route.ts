import { Router } from 'express';
import { DatasetController } from './dataset.controller';

const router = Router();

router.post('/', DatasetController.create);
router.get('/', DatasetController.findAll);
router.get('/:id', DatasetController.findOne);
router.patch('/:id', DatasetController.update);
router.delete('/:id', DatasetController.remove);

export default router;
