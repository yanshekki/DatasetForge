import { Router } from 'express';
import { TeamController } from './team.controller';

const router = Router();

router.post('/', TeamController.create);
router.get('/my-teams', TeamController.findByUser);

export default router;
