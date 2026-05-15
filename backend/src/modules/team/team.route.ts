import { Router } from 'express';
import { TeamController } from './team.controller';

const router = Router();

router.post('/', TeamController.create);
router.get('/my-teams', TeamController.findByUser);
router.post('/:teamId/members', TeamController.addMember);
router.delete('/:teamId/members/:userId', TeamController.removeMember);

export default router;
