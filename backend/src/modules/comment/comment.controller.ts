import { Request, Response } from 'express';
import { CommentService } from './comment.service';

const commentService = new CommentService();

export const createComment = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const comment = await commentService.createComment(Number(id), req.user.id, content);
    res.json({ success: true, data: comment });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create comment' });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comments = await commentService.getCommentsByDataset(Number(id));
    res.json({ success: true, data: comments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch comments' });
  }
};

export const deleteComment = async (req: any, res: Response) => {
  try {
    const { commentId } = req.params;
    await commentService.deleteComment(Number(commentId), req.user.id);
    res.json({ success: true, message: 'Comment deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to delete comment' });
  }
};
