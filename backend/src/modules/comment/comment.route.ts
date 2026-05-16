import { Router } from 'express';
import { createComment, getComments, deleteComment } from './comment.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/datasets/:id/comments', authenticateToken, createComment);
router.get('/datasets/:id/comments', authenticateToken, getComments);
router.delete('/comments/:commentId', authenticateToken, deleteComment);

export default router;
